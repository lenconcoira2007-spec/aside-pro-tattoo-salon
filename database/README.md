# Database / BD

Учебная база реализована через IndexedDB браузера. Подробная схема: docs/database-design.md. Код: JS/booking-db.js.

- БД: aside-pro-tattoo-db, версия 1.
- Object stores: services и appointments.
- Логическая связь: appointments.serviceId → services.id.
- Операции: инициализация, чтение услуг, создание заявки, чтение и удаление заявок.

Данные локальны для одного браузерного профиля и origin. Это не серверная SQL-БД и не общий список заявок. Используйте только вымышленные тестовые сведения.