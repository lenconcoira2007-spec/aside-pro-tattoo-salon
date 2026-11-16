# Первичная загрузка полного проекта в GitHub

Репозиторий: https://github.com/lenconcoira2007-spec/aside-pro-tattoo-salon

GitHub App подключено к аккаунту `lenconcoira2007-spec`; у интеграции подтверждены права чтения и записи. Первые Markdown-документы и текстовые файлы уже добавлены напрямую.

## Один ручной шаг для переноса всех бинарных файлов

1. Скачать архив `ASIDE_PRO_Tattoo_Salon_Project.zip`, подготовленный в этом чате.
2. Открыть репозиторий по ссылке выше.
3. Нажать **Add file → Upload files**.
4. Перетащить ZIP-архив в корень репозитория (не распаковывать его в браузере).
5. Внизу страницы оставить коммит в ветку `main` и нажать **Commit changes**.
6. Открыть вкладку **Actions** и проверить workflow **Import ASIDE PRO bundle and deploy GitHub Pages**.

Workflow распакует ZIP, добавит содержащиеся в нём папки и файлы в репозиторий, удалит временный ZIP из корня, создаст коммит от `github-actions[bot]` и развернёт публичную часть сайта. Для этого workflow запрашивает `contents: write`, `pages: write` и `id-token: write`.

## После успешного импорта

- Проверить, что в корне появились `index.html`, `css/`, `JS/`, `images/`, `database/`, `docs/`, `tests/`, `screenshots/`.
- Убедиться, что внутри `docs/` присутствуют ТЗ и проектная документация в формате DOCX и Markdown.
- Открыть **Settings → Pages** и убедиться, что источником публикации выбран GitHub Actions (workflow также выполняет настройку через actions/configure-pages).
- Проверить URL GitHub Pages, выведенный в Actions.

Не загружайте пароль, Personal Access Token или другие секреты в репозиторий.
