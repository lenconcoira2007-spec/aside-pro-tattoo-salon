# ASIDE PRO Tattoo Salon

Учебный веб-проект тату-салона и документация по теме «Разработка документации проекта software с использованием базы данных (BD)».

## Ссылки
- Публичный сайт: https://lenconcoira2007-spec.github.io/aside-pro-tattoo-salon/
- GitHub-репозиторий: https://github.com/lenconcoira2007-spec/aside-pro-tattoo-salon
- Успешный deployment: https://github.com/lenconcoira2007-spec/aside-pro-tattoo-salon/actions/runs/43911810737
- Успешные браузерные тесты: https://github.com/lenconcoira2007-spec/aside-pro-tattoo-salon/actions/runs/43911890901

## Состав проекта
Шесть HTML-страниц: главная, три направления услуг, отзывы и форма заявки. Папки css/, JS/, images/, database/, docs/, tests/, screenshots/auto/ и .github/workflows/ содержат стили, модули, графику, документацию, тесты, скриншоты и автоматизацию.

## База данных (BD)
Учебная форма использует IndexedDB браузера. БД aside-pro-tattoo-db, версия 1; хранилища services и appointments. Это локальное хранилище текущего браузерного профиля, а не SQL-сервер и не общая серверная база салона. Заявки не отправляются владельцу студии и не синхронизируются между устройствами.

Учебная демонстрация: https://lenconcoira2007-spec.github.io/aside-pro-tattoo-salon/tests/database-demo.html. Страница показывает записи текущего браузера и позволяет удалять тестовые строки; это не административная панель.

## Проверка
16.11.2026 автоматический сценарий Playwright Chromium выполнил 17 проверок: 17 Passed, 0 Failed. Проверены страницы, загрузка изображений, форма, IndexedDB, сохранение/чтение/удаление заявки, мобильный вид, меню, консоль и сеть. Подробности — docs/verification-results.md.

## Локальный запуск
Откройте проект в VS Code через локальный HTTP-сервер (например, Live Server). Не используйте file://: проект использует JavaScript ES-модули и IndexedDB.

## Перед коммерческим использованием
Проверьте официальное название бренда, адрес, телефон, email, цены, отзывы и права на фотографии. Не используйте публичную учебную форму для реальных клиентских данных.
