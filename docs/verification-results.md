# Результаты автоматизированной проверки ASIDE PRO Tattoo Salon

**Дата:** 16 ноября 2026 г.  
**Среда:** GitHub-hosted Ubuntu runner, Playwright Chromium  
**Опубликованный сайт:** https://lenconcoira2007-spec.github.io/aside-pro-tattoo-salon/  
**Результат:** **21 Passed / 0 Failed**  
**Снимки:** 17 фактических PNG-файлов в `screenshots/auto/`.

| № | Проверка | Фактический результат |
|---:|---|---|
| 1 | HTTP index.html | HTTP 200 — главная |
| 2 | Homepage images load | brokenImages = [] |
| 3 | HTTP tattoo.html | HTTP 200 — татуировки |
| 4 | HTTP piercing.html | HTTP 200 — пирсинг |
| 5 | HTTP removing.html | HTTP 200 — лазерное удаление |
| 6 | HTTP feedback.html | HTTP 200 — отзывы |
| 7 | HTTP registration.html | HTTP 200 — форма заявки |
| 8 | Services loaded from IndexedDB | Загружены 4 услуги: tattoo, piercing, removal, consultation |
| 9 | Required-field validation | Пустая форма не прошла checkValidity |
| 10 | Create appointment | Заявка №1 сохранена после завершения транзакции |
| 11 | IndexedDB stores and indexes are visible | Показаны 2 хранилища, ключи, индексы, поля и количество записей |
| 12 | Appointment persists and can be read | Заявка отображается после перехода на страницу IndexedDB |
| 13 | Delete test appointment | После удаления осталось 0 заявок |
| 14 | IndexedDB database exists | aside-pro-tattoo-db, версия 1 |
| 15 | Mobile layout has no horizontal overflow | innerWidth = documentWidth = bodyWidth = 390 |
| 16 | Mobile navigation toggles | Меню открыто и закрыто |
| 17 | GitHub booking form source is visible | Исходный код JS/booking.js содержит createAppointment |
| 18 | GitHub IndexedDB source is visible | Исходный код JS/booking-db.js содержит openBookingDatabase |
| 19 | GitHub IndexedDB commit patch is visible | Commit patch доступен и содержит изменения IndexedDB |
| 20 | Browser console is clean | consoleErrors = []; pageErrors = [] |
| 21 | No failed network requests | failedRequests = [] |

## Тестовые данные
Использованы вымышленные значения: имя «Тестовый Клиент», контакт `test@example.invalid`, услуга «Татуировка». Заявка №1 была создана, прочитана на отдельной странице и удалена; после удаления осталось 0 заявок.

## Результат проверки консоли и сети
`consoleErrors = []`, `pageErrors = []`, `failedRequests = []`.

## Ссылки на запуски
- Успешная публикация GitHub Pages: https://github.com/lenconcoira2007-spec/aside-pro-tattoo-salon/actions/runs/43929276157
- Успешный браузерный прогон: https://github.com/lenconcoira2007-spec/aside-pro-tattoo-salon/actions/runs/43929366311

## Границы проверки
Проверка проведена в Chromium на GitHub-hosted Ubuntu runner. Она не подтверждает отдельную совместимость со всеми браузерами из ТЗ и не заменяет проверку на локальном Windows 10. Lighthouse/Web Vitals отдельно не измерялись. IndexedDB хранит записи в текущем браузере и на текущем origin; серверная обработка заявок не реализована.
