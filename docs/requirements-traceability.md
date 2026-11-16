# Матрица трассируемости требований

| Требование | Реализация / файл | Проверка | Доказательство |
|---|---|---|---|
| FR-01 Главная страница | `index.html`, `css/style.css`, `images/` | Открыть главную, проверить ресурсы | `screenshots/01_source_site/` |
| FR-02 Страницы услуг | `tattoo.html`, `piercing.html`, `removing.html` | Перейти из карточек услуг | `screenshots/04_tests/` |
| FR-03 Портфолио | `index.html`, `images/` | Проверить загрузку изображений и alt | `screenshots/01_source_site/` |
| FR-04 Отзывы | `feedback.html` | Открыть страницу отзывов | `screenshots/04_tests/` |
| FR-05 Навигация | Все HTML, `JS/slider.js` | Проверить ссылки и мобильное меню | `screenshots/04_tests/` |
| FR-06–FR-07 Форма и валидация | `registration.html`, `JS/booking.js` | Пустая и корректная формы | `screenshots/04_tests/` |
| FR-08 Сохранение | `JS/booking-db.js` | Создать запись и проверить хранилище | `screenshots/03_database/` |
| FR-09 Связь с услугой | `JS/booking-db.js`, `docs/database-design.md` | Проверить serviceId и справочник | `screenshots/03_database/` |
| FR-10 Сообщение результата | `JS/booking.js`, `registration.html` | Проверить текст сообщения после транзакции | `screenshots/04_tests/` |
| FR-11 Обработка ошибок | `JS/booking.js`, `JS/booking-db.js` | Проверить отказ/недоступность хранилища | `screenshots/04_tests/` |
| FR-12 Безопасный вывод | `tests/database-demo.js` | Ввести HTML-строку и убедиться, что она текст | `screenshots/04_tests/` |

**Примечание:** пути в последнем столбце — требуемые места будущих снимков; файл считается доказательством только после фактического создания снимка.
