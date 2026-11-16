import { createAppointment, getServices } from './booking-db.js';

const form = document.querySelector('#booking-form');
const serviceSelect = document.querySelector('#service');
const submitButton = document.querySelector('#submit-request');
const statusBox = document.querySelector('#form-status');

function showStatus(message, type = 'success') {
  statusBox.textContent = message;
  statusBox.className = 'form-status ' + type;
  statusBox.hidden = false;
}

async function initializeBookingForm() {
  try {
    const services = await getServices();
    serviceSelect.replaceChildren(new Option('Выберите услугу', ''));
    for (const service of services) {
      serviceSelect.add(new Option(service.name + ' — ' + service.priceLabel, service.id));
    }
    submitButton.disabled = false;
  } catch (error) {
    serviceSelect.replaceChildren(new Option('Услуги временно недоступны', ''));
    showStatus('Не удалось открыть локальную базу данных: ' + error.message, 'error');
    submitButton.disabled = true;
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  statusBox.hidden = true;
  if (!form.reportValidity()) return;
  submitButton.disabled = true;
  submitButton.textContent = 'Сохранение…';
  const data = new FormData(form);
  const appointment = {
    clientName: String(data.get('clientName') || '').trim(),
    contact: String(data.get('contact') || '').trim(),
    serviceId: String(data.get('serviceId') || ''),
    preferredDate: String(data.get('preferredDate') || ''),
    preferredTime: String(data.get('preferredTime') || ''),
    comment: String(data.get('comment') || '').trim()
  };
  try {
    const saved = await createAppointment(appointment);
    form.reset();
    showStatus('Заявка №' + saved.id + ' сохранена в локальной базе этого браузера. Это не подтверждение записи: требуется отдельное согласование со студией.', 'success');
  } catch (error) {
    showStatus('Не удалось сохранить заявку: ' + error.message, 'error');
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Отправить заявку';
  }
});

initializeBookingForm();