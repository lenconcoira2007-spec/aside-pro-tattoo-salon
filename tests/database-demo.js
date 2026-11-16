import { clearAppointments, deleteAppointment, getAllAppointments, getServices } from '../JS/booking-db.js';

const list = document.querySelector('#appointments-list');
const statusBox = document.querySelector('#demo-status');
const refreshButton = document.querySelector('#refresh-list');
const clearButton = document.querySelector('#clear-list');

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

async function renderAppointments() {
  list.replaceChildren(createText('div', 'Загрузка…', 'demo-empty'));
  try {
    const [appointments, services] = await Promise.all([getAllAppointments(), getServices()]);
    const serviceMap = new Map(services.map((service) => [service.id, service.name]));
    list.replaceChildren();

    if (appointments.length === 0) {
      list.append(createText('div', 'В этой базе пока нет заявок.', 'demo-empty'));
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
      const removeButton = createText('button', 'Удалить заявку', 'btn secondary');
      removeButton.type = 'button';
      removeButton.addEventListener('click', async () => {
        removeButton.disabled = true;
        try {
          await deleteAppointment(appointment.id);
          status(`Заявка №${appointment.id} удалена.`, 'success');
          await renderAppointments();
        } catch (error) {
          status(`Не удалось удалить заявку: ${error.message}`, 'error');
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

refreshButton.addEventListener('click', renderAppointments);
clearButton.addEventListener('click', async () => {
  if (!window.confirm('Удалить все локальные заявки в этом браузере?')) return;
  try {
    await clearAppointments();
    status('Все локальные заявки удалены.', 'success');
    await renderAppointments();
  } catch (error) {
    status(`Не удалось очистить хранилище: ${error.message}`, 'error');
  }
});

renderAppointments();
