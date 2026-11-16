import { createAppointment, getServices } from './booking-db.js';

const form = document.querySelector('#booking-form');
const serviceSelect = document.querySelector('#service');
const submitButton = document.querySelector('#submit-request');
const statusBox = document.querySelector('#form-status');

function showStatus(message, type = 'success') {
  statusBox.textContent = message;
  statusBox.className = `form-status ${type}`;
  statusBox.hidden = false;
}

async function initializeBookingForm() {
  try {
    const services = await getServices();
    serviceSelect.replaceChildren(new Option('Выберите услугу', ''));

    for (const service of services) {
      const option = new Option(`${service.name} — ${service.priceLabel}`, service.id);
      serviceSelect.add(option);
    }

    submitButton.disabled = false;
  } catch (error) {
    serviceSelect.replaceChildren(new Option('Услуги временно недоступны', ''));
    showStatus(`Не удалось открыть локальную базу данных: ${error.message}`, 'error');
    submitButton.disabled = true;
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  statusBox.hidden = true;

  if (!form.reportValidity()) return;

  submitButton.disabled = true;
  submitButton.textContent = 'Сохранение…';

  const formData = new FormData(form);
  const appointment = {
    clientName: String(formData.get('clientName') || '').trim(),
    contact: String(formData.get('contact') || '').trim(),
    serviceId: String(formData.get('serviceId') || ''),
    preferredDate: String(formData.get('preferredDate') || ''),
    preferredTime: String(formData.get('preferredTime') || ''),
    comment: String(formData.get('comment') || '').trim(),
  };

  try {
    const saved = await createAppointment(appointment);
    form.reset();
    showStatus(`Заявка №${saved.id} сохранена в локальной базе этого браузера. Это не подтверждение записи: для реального визита требуется отдельное согласование со студией.`, 'success');
  } catch (error) {
    showStatus(`Не удалось сохранить заявку: ${error.message}`, 'error');
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Отправить заявку';
  }
});

initializeBookingForm();
