import { clearAppointments, deleteAppointment, getAllAppointments, getServices, openBookingDatabase } from '../JS/booking-db.js';

const list = document.querySelector('#appointments-list');
const statusBox = document.querySelector('#demo-status');
const refreshButton = document.querySelector('#refresh-list');
const clearButton = document.querySelector('#clear-list');
const schemaBox = document.querySelector('#database-schema');
const databaseMeta = document.querySelector('#database-meta');

function status(message, type='success') {
  statusBox.textContent = message;
  statusBox.className = `form-status ${type}`;
  statusBox.hidden = false;
}

function createText(tag, text, className='') {
  const element = document.createElement(tag);
  element.textContent = text;
  if (className) element.className = className;
  return element;
}

function requestValue(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Не удалось прочитать IndexedDB.'));
  });
}

async function renderDatabaseSchema() {
  try {
    const database = await openBookingDatabase();
    const storeNames = Array.from(database.objectStoreNames);
    databaseMeta.textContent = `База: ${database.name} · Версия: ${database.version} · Хранилищ: ${storeNames.length}`;

    const table = document.createElement('table');
    table.className = 'schema-table';
    const thead = document.createElement('thead');
    const header = document.createElement('tr');
    for (const label of ['Хранилище', 'Ключ', 'Индексы', 'Полей в записи', 'Записей']) {
      header.append(createText('th', label));
    }
    thead.append(header);
    table.append(thead);

    const tbody = document.createElement('tbody');
    for (const storeName of storeNames) {
      const transaction = database.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const records = await requestValue(store.getAll());
      const indexDetails = Array.from(store.indexNames).map((indexName) => {
        const index = store.index(indexName);
        return `${index.name} → ${index.keyPath}${index.unique ? ' (unique)' : ''}`;
      });
      const fields = records.length ? Object.keys(records[0]).join(', ') : 'Нет записей для примера';
      const key = Array.isArray(store.keyPath) ? store.keyPath.join(', ') : String(store.keyPath);
      const row = document.createElement('tr');
      row.append(createText('td', storeName));
      row.append(createText('td', key + (store.autoIncrement ? ' · autoIncrement' : '')));
      row.append(createText('td', indexDetails.length ? indexDetails.join('; ') : 'Нет'));
      row.append(createText('td', fields));
      row.append(createText('td', String(records.length)));
      tbody.append(row);
    }
    table.append(tbody);
    schemaBox.replaceChildren(table);
  } catch (error) {
    schemaBox.replaceChildren(createText('div', 'Не удалось прочитать структуру базы: ' + error.message, 'demo-empty'));
    databaseMeta.textContent = 'Структура IndexedDB недоступна';
  }
}

async function renderAppointments() {
  list.replaceChildren(createText('div', 'Загрузка…', 'demo-empty'));
  try {
    const [appointments, services] = await Promise.all([getAllAppointments(), getServices()]);
    const serviceMap = new Map(services.map((service) => [service.id, service.name]));
    list.replaceChildren();

    if (appointments.length === 0) {
      list.append(createText('div', 'В базе пока нет заявок.', 'demo-empty'));
      return;
    }

    for (const appointment of appointments) {
      const card = document.createElement('article');
      card.className = 'demo-item';
      card.append(createText('h3', `Заявка №${appointment.id} · ${appointment.clientName}`));
      card.append(createText('p', `Контакт: ${appointment.contact}`));
      card.append(createText('p', `Услуга: ${serviceMap.get(appointment.serviceId) || appointment.serviceId}`));
      card.append(createText('p', `Создана: ${new Date(appointment.createdAt).toLocaleString('ru-RU')}`));
      card.append(createText('p', `Статус: ${appointment.status}`));
      if (appointment.preferredDate || appointment.preferredTime) {
        card.append(createText('p', `Предпочтительное время: ${appointment.preferredDate || 'не указана'} ${appointment.preferredTime || ''}`));
      }
      if (appointment.comment) card.append(createText('p', `Комментарий: ${appointment.comment}`));
      const removeButton = createText('button', 'Удалить запись', 'btn secondary');
      removeButton.type = 'button';
      removeButton.addEventListener('click', async () => {
        removeButton.disabled = true;
        try {
          await deleteAppointment(appointment.id);
          status(`Запись №${appointment.id} удалена.`, 'success');
          await renderAppointments();
          await renderDatabaseSchema();
        } catch (error) {
          status(`Не удалось удалить запись: ${error.message}`, 'error');
          removeButton.disabled = false;
        }
      });
      card.append(removeButton);
      list.append(card);
    }
  } catch (error) {
    list.replaceChildren(createText('div', `Ошибка чтения базы: ${error.message}`, 'demo-empty'));
  }
}

refreshButton.addEventListener('click', async () => {
  await Promise.all([renderAppointments(), renderDatabaseSchema()]);
});
clearButton.addEventListener('click', async () => {
  if (!window.confirm('Удалить все записи из локального хранилища этого браузера?')) return;
  try {
    await clearAppointments();
    status('Все записи удалены.', 'success');
    await Promise.all([renderAppointments(), renderDatabaseSchema()]);
  } catch (error) {
    status(`Не удалось очистить хранилище: ${error.message}`, 'error');
  }
});

Promise.all([renderDatabaseSchema(), renderAppointments()]);
