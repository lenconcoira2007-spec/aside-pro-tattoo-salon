# План и фактические результаты проверки ASIDE PRO Tattoo Salon

**Дата:** 20 ноября 2026 г.  
**Среда:** GitHub-hosted Ubuntu runner, Playwright Chromium  
**Сайт:** https://lenconcoira2007-spec.github.io/aside-pro-tattoo-salon/

| ID | Проверка | Фактический результат | Итог |
|---|---|---|---|
| TC-01 | HTTP index.html | HTTP 200 — главная страница | Passed |
| TC-02 | Homepage images load | Все изображения главной страницы загружены | Passed |
| TC-03 | HTTP tattoo.html | HTTP 200 — татуировки | Passed |
| TC-04 | HTTP piercing.html | HTTP 200 — пирсинг | Passed |
| TC-05 | HTTP removing.html | HTTP 200 — лазерное удаление | Passed |
| TC-06 | HTTP feedback.html | HTTP 200 — отзывы | Passed |
| TC-07 | HTTP registration.html | HTTP 200 — форма заявки | Passed |
| TC-08 | Services loaded from IndexedDB | Загружены 4 услуги: tattoo, piercing, removal, consultation | Passed |
| TC-09 | Required-field validation | Пустая форма не проходит checkValidity | Passed |
| TC-10 | Create appointment | Заявка №1 сохранена после завершения транзакции | Passed |
| TC-11 | IndexedDB stores and indexes are visible | Показаны services и appointments, ключи, индексы, поля и количество записей | Passed |
| TC-12 | Appointment persists and can be read | Заявка отображается после перехода на страницу IndexedDB | Passed |
| TC-13 | Delete test appointment | После удаления осталось 0 заявок | Passed |
| TC-14 | IndexedDB database exists | aside-pro-tattoo-db, версия 1 | Passed |
| TC-15 | Mobile layout has no horizontal overflow | innerWidth = documentWidth = bodyWidth = 390 | Passed |
| TC-16 | Mobile navigation toggles | Мобильное меню открывается и закрывается | Passed |
| TC-17 | GitHub booking form source is visible | Исходный код JS/booking.js содержит createAppointment | Passed |
| TC-18 | GitHub IndexedDB source is visible | Исходный код JS/booking-db.js содержит openBookingDatabase | Passed |
| TC-19 | GitHub IndexedDB commit details are available | Детали коммита c12a2e06 доступны через GitHub API | Passed |
| TC-20 | GitHub database folder is visible | Папка database доступна в GitHub, HTTP 200 | Passed |
| TC-21 | GitHub database README is visible | database/README.md доступен в GitHub, HTTP 200 | Passed |
| TC-22 | GitHub database design document is visible | docs/database-design.md доступен в GitHub, HTTP 200 | Passed |
| TC-23 | GitHub ER diagram source is visible | docs/er-diagram.mmd доступен в GitHub, HTTP 200 | Passed |
| TC-24 | GitHub requirements traceability matrix is visible | docs/requirements-traceability.md доступен в GitHub, HTTP 200 | Passed |
| TC-25 | GitHub database guide is visible | docs/github-database-guide.md доступен в GitHub, HTTP 200 | Passed |
| TC-26 | GitHub rendered ER diagram is visible | docs/er-diagram.png загружен, размер 1525 × 890 px | Passed |
| TC-27 | Browser console is clean | consoleErrors = []; pageErrors = [] | Passed |
| TC-28 | No failed network requests | failedRequests = [] | Passed |

## Итог
**28 проверок пройдены, 0 не пройдены.** Полный журнал находится в `verification-results.md`, JSON-отчёт — в `screenshots/auto/test-results.json`.

## Тестовые данные
Использованы вымышленные значения: имя «Тестовый Клиент», контакт `test@example.invalid`, услуга «Татуировка». Заявка была создана, прочитана на отдельной странице и удалена. После удаления список пуст.

## Границы проверки
Проверка выполнена в Chromium на GitHub-hosted Ubuntu runner. Совместимость со всеми браузерами из ТЗ и отдельная проверка на локальном Windows 10 не подтверждались. Lighthouse/Web Vitals отдельно не измерялись. IndexedDB хранит данные локально в текущем браузере и на текущем origin.
