# Матрица трассируемости требований

В таблице показано, где реализовано требование, как проверить его работу и какой файл с фактическим скриншотом подтверждает результат.

| Требование | Реализация / файл | Проверка | Доказательство |
|---|---|---|---|
| FR-01 Главная страница | `index.html`, `css/style.css`, `images/` | Открыть главную и проверить изображения | `screenshots/auto/01-homepage.png` |
| FR-02 Страницы услуг | `tattoo.html`, `piercing.html`, `removing.html` | Открыть все три страницы | `screenshots/auto/02-tattoo-service.png`, `03-piercing-service.png`, `04-removal-service.png` |
| FR-03 Портфолио | `index.html`, `images/` | Проверить загрузку изображений | `screenshots/auto/01-homepage.png` |
| FR-04 Отзывы | `feedback.html` | Открыть страницу отзывов | `screenshots/auto/05-feedback.png` |
| FR-05 Навигация | Все HTML, `JS/slider.js` | Проверить переходы и мобильное меню | `screenshots/auto/10-mobile-homepage.png` |
| FR-06 Форма | `registration.html`, `JS/booking.js` | Открыть и заполнить форму | `screenshots/auto/06-registration.png` |
| FR-07 Валидация | `JS/booking.js`, `registration.html` | Отправить пустую форму | `screenshots/auto/test-results.json` |
| FR-08 Сохранение заявки | `JS/booking-db.js` | Создать тестовую запись | `screenshots/auto/07-test-appointment-saved.png` |
| FR-09 Связь с услугой | `JS/booking-db.js`, `docs/database-design.md` | Проверить `serviceId` и хранилище услуг | `screenshots/auto/14-indexeddb-schema.png` |
| FR-10 Чтение заявки | `tests/database-demo.js` | Открыть список заявок после отправки | `screenshots/auto/08-indexeddb-appointment-visible.png` |
| FR-11 Удаление заявки | `tests/database-demo.js`, `JS/booking-db.js` | Удалить тестовую запись | `screenshots/auto/09-indexeddb-after-delete.png` |
| FR-12 Просмотр структуры | `tests/database-demo.js`, `JS/booking-db.js` | Проверить хранилища, ключи и индексы | `screenshots/auto/14-indexeddb-schema.png` |

**Примечание:** скриншоты из папки `screenshots/auto/` получены автоматическим браузером Chromium в GitHub Actions. Они подтверждают работу опубликованной версии сайта и тестовые операции с локальным хранилищем IndexedDB.
