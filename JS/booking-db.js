// IndexedDB layer for the ASIDE PRO Tattoo Salon educational project.
export const DB_NAME = 'aside-pro-tattoo-db';
export const DB_VERSION = 1;

export const DEFAULT_SERVICES = [
  { id: 'tattoo', name: 'Татуировка', priceLabel: 'от 40 €', active: true, sortOrder: 1 },
  { id: 'piercing', name: 'Пирсинг', priceLabel: 'от 10 €', active: true, sortOrder: 2 },
  { id: 'removal', name: 'Лазерное удаление', priceLabel: 'от 20 €', active: true, sortOrder: 3 },
  { id: 'consultation', name: 'Консультация', priceLabel: 'по согласованию', active: true, sortOrder: 4 },
];

let databasePromise;

function requestResult(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Ошибка IndexedDB-запроса.'));
  });
}

function transactionResult(transaction) {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error || new Error('Транзакция IndexedDB завершилась с ошибкой.'));
    transaction.onabort = () => reject(transaction.error || new Error('Транзакция IndexedDB была отменена.'));
  });
}

async function seedServices(database) {
  const transaction = database.transaction('services', 'readwrite');
  const transactionDone = transactionResult(transaction);
  const store = transaction.objectStore('services');
  const count = await requestResult(store.count());
  if (count === 0) {
    for (const service of DEFAULT_SERVICES) store.put(service);
  }
  await transactionDone;
}

export function openBookingDatabase() {
  if (!('indexedDB' in window)) {
    return Promise.reject(new Error('Этот браузер не поддерживает IndexedDB.'));
  }

  if (!databasePromise) {
    databasePromise = new Promise((resolve, reject) => {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = () => {
        const database = request.result;

        if (!database.objectStoreNames.contains('services')) {
          const services = database.createObjectStore('services', { keyPath: 'id' });
          services.createIndex('byActive', 'active', { unique: false });
        }

        if (!database.objectStoreNames.contains('appointments')) {
          const appointments = database.createObjectStore('appointments', {
            keyPath: 'id',
            autoIncrement: true,
          });
          appointments.createIndex('byService', 'serviceId', { unique: false });
          appointments.createIndex('byCreatedAt', 'createdAt', { unique: false });
          appointments.createIndex('byStatus', 'status', { unique: false });
        }
      };

      request.onsuccess = async () => {
        const database = request.result;
        database.onversionchange = () => database.close();
        try {
          await seedServices(database);
          resolve(database);
        } catch (error) {
          database.close();
          databasePromise = undefined;
          reject(error);
        }
      };

      request.onerror = () => {
        databasePromise = undefined;
        reject(request.error || new Error('Не удалось открыть локальную базу данных.'));
      };

      request.onblocked = () => {
        databasePromise = undefined;
        reject(new Error('База данных заблокирована другой открытой вкладкой. Закройте старые вкладки и повторите попытку.'));
      };
    });
  }

  return databasePromise;
}

export async function getServices() {
  const database = await openBookingDatabase();
  const transaction = database.transaction('services', 'readonly');
  const transactionDone = transactionResult(transaction);
  const result = await requestResult(transaction.objectStore('services').getAll());
  await transactionDone;
  return result.filter((service) => service.active).sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function createAppointment(input) {
  const database = await openBookingDatabase();

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(['services', 'appointments'], 'readwrite');
    const services = transaction.objectStore('services');
    const appointments = transaction.objectStore('appointments');
    let newId = null;
    let operationError = null;

    const serviceRequest = services.get(input.serviceId);
    serviceRequest.onsuccess = () => {
      const service = serviceRequest.result;
      if (!service || !service.active) {
        operationError = new Error('Выбранная услуга недоступна. Обновите страницу и выберите услугу ещё раз.');
        transaction.abort();
        return;
      }

      const record = {
        clientName: String(input.clientName || '').trim(),
        contact: String(input.contact || '').trim(),
        serviceId: service.id,
        comment: String(input.comment || '').trim(),
        preferredDate: input.preferredDate || '',
        preferredTime: input.preferredTime || '',
        createdAt: new Date().toISOString(),
        status: 'new',
      };

      if (record.clientName.length < 2 || record.contact.length < 5) {
        operationError = new Error('Проверьте имя и контактные данные.');
        transaction.abort();
        return;
      }

      const addRequest = appointments.add(record);
      addRequest.onsuccess = () => { newId = addRequest.result; };
      addRequest.onerror = () => {
        operationError = addRequest.error || new Error('Не удалось сохранить заявку.');
      };
    };

    serviceRequest.onerror = () => {
      operationError = serviceRequest.error || new Error('Не удалось проверить выбранную услугу.');
      transaction.abort();
    };

    transaction.oncomplete = () => resolve({ id: newId });
    transaction.onerror = () => reject(operationError || transaction.error || new Error('Ошибка сохранения заявки.'));
    transaction.onabort = () => reject(operationError || transaction.error || new Error('Сохранение заявки отменено.'));
  });
}

export async function getAllAppointments() {
  const database = await openBookingDatabase();
  const transaction = database.transaction('appointments', 'readonly');
  const transactionDone = transactionResult(transaction);
  const result = await requestResult(transaction.objectStore('appointments').getAll());
  await transactionDone;
  return result.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function deleteAppointment(id) {
  const database = await openBookingDatabase();
  const transaction = database.transaction('appointments', 'readwrite');
  const transactionDone = transactionResult(transaction);
  transaction.objectStore('appointments').delete(Number(id));
  await transactionDone;
}

export async function clearAppointments() {
  const database = await openBookingDatabase();
  const transaction = database.transaction('appointments', 'readwrite');
  const transactionDone = transactionResult(transaction);
  transaction.objectStore('appointments').clear();
  await transactionDone;
}
