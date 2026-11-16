# Результаты проверки проекта ASIDE PRO Tattoo Salon

**Дата:** 16.11.2026  
**Среда:** GitHub-hosted Ubuntu runner, Playwright Chromium  
**Опубликованный URL:** https://lenconcoira2007-spec.github.io/aside-pro-tattoo-salon/  
**Итог:** **17 Passed / 0 Failed**

| № | Проверка | Результат | Фактическое наблюдение |
|---:|---|---|---|
| 1 | HTTP index.html | Passed | HTTP 200 |
| 2 | Изображения главной | Passed | Отсутствующие изображения не обнаружены |
| 3 | HTTP tattoo.html | Passed | HTTP 200 |
| 4 | HTTP piercing.html | Passed | HTTP 200 |
| 5 | HTTP removing.html | Passed | HTTP 200 |
| 6 | HTTP feedback.html | Passed | HTTP 200 |
| 7 | HTTP registration.html | Passed | HTTP 200 |
| 8 | Загрузка услуг из IndexedDB | Passed | 4 услуги: tattoo, piercing, removal, consultation |
| 9 | Валидация обязательных полей | Passed | Пустая форма не прошла checkValidity |
| 10 | Создание тестовой заявки | Passed | Заявка №1 сохранена, сообщение после транзакции |
| 11 | Чтение после перехода | Passed | Заявка №1 отображалась на странице database-demo |
| 12 | Удаление заявки | Passed | После удаления осталось 0 записей |
| 13 | Наличие IndexedDB | Passed | aside-pro-tattoo-db, версия 1 |
| 14 | Мобильная ширина 390 px | Passed | innerWidth=390, documentWidth=390, bodyWidth=390 |
| 15 | Мобильная навигация | Passed | Меню открылось и закрылось |
| 16 | Консоль и JavaScript | Passed | consoleErrors=[], pageErrors=[] |
| 17 | Сетевые запросы | Passed | failedRequests=[] |

## Тестовые данные
Использованы вымышленные значения: «Тестовый Клиент», test@example.invalid, услуга «Татуировка». Проверочная запись была удалена после сценария; в хранилище осталось 0 записей.

## Скриншоты
13 PNG-файлов находятся в screenshots/auto/: шесть основных страниц, сохранённая заявка, её просмотр, состояние после удаления, мобильная главная, репозиторий GitHub, история коммитов и успешный GitHub Actions.

Снимки созданы реальным Chromium в GitHub Actions. Они подтверждают опубликованную веб-версию и автоматический сценарий, но не являются снимками локального рабочего стола Windows 10.

## Запуски
Deployment: https://github.com/lenconcoira2007-spec/aside-pro-tattoo-salon/actions/runs/43911810737
Browser tests: https://github.com/lenconcoira2007-spec/aside-pro-tattoo-salon/actions/runs/43911890901

## Ограничения
Проверка выполнена в Chromium на GitHub-hosted Ubuntu runner. Совместимость со всеми браузерами из ТЗ и локальный запуск на Windows 10 отдельно не подтверждались. Lighthouse/Web Vitals отдельно не измерялись. IndexedDB — локальное браузерное хранилище, не SQL-СУБД и не серверная база.
