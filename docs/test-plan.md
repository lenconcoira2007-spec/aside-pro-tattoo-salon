# План и фактические результаты проверки ASIDE PRO Tattoo Salon

**Дата:** 20 ноября 2026 г.  
**Среда:** GitHub-hosted Ubuntu runner, Playwright Chromium  
**Сайт:** https://lenconcoira2007-spec.github.io/aside-pro-tattoo-salon/

| ID | Проверка | Ожидаемый результат | Факт |
|---|---|---|---|
| TC-01 | HTTP index.html | HTTP 200 | Passed |
| TC-02 | Homepage images load | Ошибка загрузки изображений отсутствует | Passed |
| TC-03 | HTTP tattoo.html | HTTP 200 | Passed |
| TC-04 | HTTP piercing.html | HTTP 200 | Passed |
| TC-05 | HTTP removing.html | HTTP 200 | Passed |
| TC-06 | HTTP feedback.html | HTTP 200 | Passed |
| TC-07 | HTTP registration.html | HTTP 200 | Passed |
| TC-08 | Services loaded from IndexedDB | Четыре услуги доступны в списке | Passed |
| TC-09 | Required-field validation | Пустая форма заблокирована | Passed |
| TC-10 | Create appointment | Сообщение о локальном сохранении | Passed |
| TC-11 | IndexedDB stores and indexes are visible | Реальная структура IndexedDB читается из браузера | Passed |
| TC-12 | Appointment persists and can be read | Сохранённая запись прочитана | Passed |
| TC-13 | Delete test appointment | Запись удалена | Passed |
| TC-14 | IndexedDB database exists | БД открывается | Passed |
| TC-15 | Mobile layout has no horizontal overflow | Нет горизонтальной прокрутки | Passed |
| TC-16 | Mobile navigation toggles | Переключение меню работает | Passed |
| TC-17 | GitHub booking form source is visible | Код доступен на GitHub | Passed |
| TC-18 | GitHub IndexedDB source is visible | Код доступен на GitHub | Passed |
| TC-19 | GitHub IndexedDB commit patch is visible | Изменения транзакций видны в diff | Passed |
| TC-20 | Browser console is clean | Ошибок нет | Passed |
| TC-21 | No failed network requests | Ошибок нет | Passed |

## Итог
**21 проверка пройдена, 0 не пройдены.** Полный журнал находится в `verification-results.md`, JSON-отчёт — в `screenshots/auto/test-results.json`.

## Тестовые данные
Использованы вымышленные значения: имя «Тестовый Клиент», контакт `test@example.invalid`, услуга «Татуировка». Заявка была создана, прочитана на отдельной странице и удалена. После удаления список пуст.

## Границы проверки
Проверка выполнена в Chromium на GitHub-hosted Ubuntu runner. Совместимость со всеми браузерами из ТЗ и отдельная проверка на локальном Windows 10 не подтверждались. Lighthouse/Web Vitals отдельно не измерялись. IndexedDB хранит данные локально в текущем браузере и на текущем origin.
