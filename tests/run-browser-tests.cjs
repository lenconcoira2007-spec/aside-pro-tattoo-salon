const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');

const SITE = process.env.SITE_BASE_URL || 'https://lenconcoira2007-spec.github.io/aside-pro-tattoo-salon/';
const REPO = process.env.REPOSITORY_URL || 'https://github.com/lenconcoira2007-spec/aside-pro-tattoo-salon';
const DEPLOY_RUN_ID = process.env.DEPLOY_RUN_ID || '';
const OUT = path.join(process.cwd(), 'screenshots', 'auto');
fs.mkdirSync(OUT, { recursive: true });

const results = [];
const consoleErrors = [];
const pageErrors = [];
const failedRequests = [];

function record(name, passed, details = {}) {
  results.push({ name, status: passed ? 'Passed' : 'Failed', ...details });
}

async function openPage(page, file) {
  const response = await page.goto(new URL(file, SITE).toString(), { waitUntil: 'networkidle', timeout: 60000 });
  record('HTTP ' + file, !!response && response.status() === 200, { httpStatus: response ? response.status() : null });
  return response;
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  let fatalError = null;
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  page.setDefaultTimeout(15000);
  page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
  page.on('pageerror', error => pageErrors.push(String(error)));
  page.on('requestfailed', request => failedRequests.push({ url: request.url(), error: request.failure()?.errorText || 'failed' }));

  try {
    const pages = [
      ['index.html', '01-homepage.png'],
      ['tattoo.html', '02-tattoo-service.png'],
      ['piercing.html', '03-piercing-service.png'],
      ['removing.html', '04-removal-service.png'],
      ['feedback.html', '05-feedback.png'],
      ['registration.html', '06-registration.png']
    ];

    for (const [file, screenshot] of pages) {
      await openPage(page, file);
      await page.screenshot({ path: path.join(OUT, screenshot), fullPage: true });
      if (file === 'index.html') {
        const brokenImages = await page.locator('img').evaluateAll(images =>
          images.filter(image => !image.complete || image.naturalWidth === 0).map(image => image.getAttribute('src'))
        );
        record('Homepage images load', brokenImages.length === 0, { brokenImages });
      }
    }

    // Validate and submit a clearly fictional test request.
    await page.goto(new URL('registration.html', SITE).toString(), { waitUntil: 'networkidle' });
    await page.waitForFunction(() => {
      const select = document.querySelector('#service');
      return select && select.options.length >= 2 && !select.disabled;
    });
    const options = await page.locator('#service option').evaluateAll(items => items.map(item => ({ value: item.value, text: item.textContent })));
    record('Services loaded from IndexedDB', options.some(option => option.value === 'tattoo'), { options });

    const emptyFormValidity = await page.locator('#booking-form').evaluate(form => form.checkValidity());
    record('Required-field validation', emptyFormValidity === false, { emptyFormValidity });

    await page.locator('#name').fill('Тестовый Клиент');
    await page.locator('#phone').fill('test@example.invalid');
    await page.locator('#service').selectOption('tattoo');
    await page.locator('#text').fill('Автоматическая учебная проверка; запись не является реальной.');
    await page.locator('#submit-request').click();
    await page.waitForFunction(() => {
      const element = document.querySelector('#form-status');
      return element && !element.hidden && element.textContent.includes('сохранена');
    });
    const successMessage = await page.locator('#form-status').innerText();
    await page.screenshot({ path: path.join(OUT, '07-test-appointment-saved.png'), fullPage: true });
    record('Create appointment', successMessage.includes('сохранена'), { successMessage });

    // Check persistence in a separate page load, then delete the test row.
    await page.goto(new URL('tests/database-demo.html', SITE).toString(), { waitUntil: 'networkidle' });
    await page.waitForFunction(() => document.querySelectorAll('.demo-item').length === 1);
    const cardText = await page.locator('.demo-item').first().innerText();
    await page.screenshot({ path: path.join(OUT, '08-indexeddb-appointment-visible.png'), fullPage: true });
    record('Appointment persists and can be read', cardText.includes('Тестовый Клиент'), { cardText });

    page.once('dialog', dialog => dialog.accept());
    await page.locator('#clear-list').click();
    await page.waitForFunction(() => {
      const empty = document.querySelector('.demo-empty');
      return document.querySelectorAll('.demo-item').length === 0 && empty && empty.textContent.includes('нет заявок');
    });
    await page.screenshot({ path: path.join(OUT, '09-indexeddb-after-delete.png'), fullPage: true });
    record('Delete test appointment', true, { remainingCards: await page.locator('.demo-item').count() });

    const databases = await page.evaluate(async () => (await indexedDB.databases()).map(database => ({ name: database.name, version: database.version })));
    record('IndexedDB database exists', databases.some(database => database.name === 'aside-pro-tattoo-db'), { databases });

    // Mobile viewport and navigation interaction.
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(new URL('index.html', SITE).toString(), { waitUntil: 'networkidle' });
    const dimensions = await page.evaluate(() => ({
      innerWidth: window.innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.scrollWidth
    }));
    record('Mobile layout has no horizontal overflow', dimensions.documentWidth <= dimensions.innerWidth && dimensions.bodyWidth <= dimensions.innerWidth, { dimensions });
    await page.screenshot({ path: path.join(OUT, '10-mobile-homepage.png'), fullPage: true });

    const menuButton = page.locator('.menu-btn');
    if (await menuButton.count()) {
      await menuButton.click();
      const opened = (await page.locator('.nav').getAttribute('class') || '').includes('open');
      await menuButton.click();
      const closed = !((await page.locator('.nav').getAttribute('class') || '').includes('open'));
      record('Mobile navigation toggles', opened && closed, { opened, closed });
    } else {
      record('Mobile navigation toggles', false, { reason: 'menu button not found' });
    }

    // Capture genuine GitHub UI pages for repository/process evidence.
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(REPO, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(2500);
    await page.screenshot({ path: path.join(OUT, '11-github-repository.png'), fullPage: true });
    await page.goto(REPO + '/commits/main', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(OUT, '12-github-commit-history.png'), fullPage: true });
    if (DEPLOY_RUN_ID) {
      await page.goto(REPO + '/actions/runs/' + DEPLOY_RUN_ID, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(OUT, '13-github-actions-success.png'), fullPage: true });
    }

    record('Browser console is clean', consoleErrors.length === 0 && pageErrors.length === 0, { consoleErrors, pageErrors });
    record('No failed network requests', failedRequests.length === 0, { failedRequests });
  } catch (error) {
    fatalError = String(error);
    console.error(error);
  } finally {
    await browser.close();
  }

  const report = {
    project: 'ASIDE PRO Tattoo Salon',
    baseUrl: SITE,
    testedAt: new Date().toISOString(),
    environment: 'GitHub-hosted Ubuntu runner, Playwright Chromium',
    results,
    consoleErrors,
    pageErrors,
    failedRequests,
    fatalError,
    screenshots: fs.readdirSync(OUT).filter(file => file.endsWith('.png')).sort()
  };
  fs.writeFileSync(path.join(OUT, 'test-results.json'), JSON.stringify(report, null, 2), 'utf8');

  const passed = results.filter(result => result.status === 'Passed').length;
  const failed = results.filter(result => result.status === 'Failed').length;
  const summary = [
    '# Automated browser verification',
    '',
    '- Project: ASIDE PRO Tattoo Salon',
    '- Date: ' + report.testedAt,
    '- Environment: GitHub-hosted Ubuntu runner, Playwright Chromium',
    '- Published URL: ' + SITE,
    '- Passed: ' + passed,
    '- Failed: ' + failed,
    '',
    ...results.map(result => '- [' + result.status + '] ' + result.name),
    '',
    'Screenshots are stored in `screenshots/auto/`. Only actual browser captures are included.',
    ''
  ].join('\n');
  fs.writeFileSync(path.join(OUT, 'test-summary.md'), summary, 'utf8');

  const verificationPath = path.join(process.cwd(), 'docs', 'verification-results.md');
  fs.writeFileSync(verificationPath, summary, 'utf8');

  const evidenceRows = report.screenshots.map(file => '| ' + file + ' | screenshots/auto/' + file + ' | Captured in GitHub-hosted Chromium |');
  const evidence = [
    '# Реестр автоматических скриншотов-подтверждений',
    '',
    'Снимки получены в реальном браузере Chromium на GitHub-hosted Ubuntu runner при проверке опубликованного сайта. Они не являются снимками локального Windows-экрана.',
    '',
    '| Файл | Путь | Происхождение |',
    '|---|---|---|',
    ...evidenceRows,
    ''
  ].join('\\n');
  fs.writeFileSync(path.join(process.cwd(), 'docs', 'evidence-register.md'), evidence, 'utf8');

  if (failed > 0 || fatalError) process.exitCode = 1;
})().catch(error => {
  console.error(error);
  process.exit(1);
});
