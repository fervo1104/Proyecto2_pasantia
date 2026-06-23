const PATTERNS = {
  numero_identificacion: /^[A-Za-z0-9]{5,20}$/,
  nombre: /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{2,80}$/,
  correo: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
  telefono: /^[0-9+\- ]{7,20}$/,
  direccion: /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 .,#\-/]{5,200}$/,
  canton: /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{2,60}$/,
  distrito: /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{2,60}$/,
  descripcion: /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 .,;:¡!¿?\-\n]{10,1000}$/,
};
// Mensaje específico que se muestra debajo de cada campo cuando es inválido.
const MESSAGES = {
  tipo_identificacion: 'Selecciona un tipo de identificación.',
  numero_identificacion: 'Solo números, entre 5-20 caracteres.',
  nombre: 'Solo letras y espacios, entre 2-80 caracteres.',
  correo: 'Ingresa un correo válido, como nombre@dominio.com.',
  telefono: 'Solo números, espacios, 8-11 caracteres.',
  provincia: 'Selecciona una provincia.',
  canton: 'Solo letras y espacios, entre 2-60 caracteres.',
  distrito: 'Solo letras y espacios, entre 2-60 caracteres.',
  direccion: 'Usa letras, números y puntuación básica, entre 5-100 caracteres.',
  tipo_incidente: 'Selecciona un tipo de incidente.',
  descripcion: 'Describe el incidente con al menos 10 caracteres (máximo 500).',
};

const form = document.getElementById('formulario');
const mensaje = document.getElementById('mensaje');

function setFieldState(field, isValid) {
  const group = field.closest('.form-group');
  if (!group) return;
  group.classList.toggle('invalid', !isValid);
  field.setAttribute('aria-invalid', String(!isValid));

  const errorEl = document.getElementById(`error-${field.name}`);
  console.log(errorEl);
  if (errorEl) {
    errorEl.textContent = isValid ? '' :`${MESSAGES[field.name] || 'Este campo no es válido.'}`;
  }
}

function clearAllFieldStates() {
  form.querySelectorAll('input, select, textarea').forEach((field) => {
    field.closest('.form-group')?.classList.remove('invalid');
    field.removeAttribute('aria-invalid');
    const errorEl = document.getElementById(`error-${field.name}`);
    if (errorEl) errorEl.textContent = '';
  });
}

function validateField(field) {
  const name = field.name;
  if (field.tagName === 'SELECT') {
    const valid = field.value !== '';
    setFieldState(field, valid);
    return valid;
  }
  const pattern = PATTERNS[name];
  const valid = pattern ? pattern.test(field.value.trim()) : field.value.trim().length > 0;
  setFieldState(field, valid);
  return valid;
}

form.querySelectorAll('input, select, textarea').forEach((field) => {
  field.addEventListener('input', () => validateField(field));
  field.addEventListener('blur', () => validateField(field));
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  let allValid = true;
  let firstInvalidField = null;
  form.querySelectorAll('input, select, textarea').forEach((field) => {
    if (!validateField(field)) {
      allValid = false;
      if (!firstInvalidField) firstInvalidField = field;
    }
  });

  mensaje.classList.remove('ok', 'error');

  if (!allValid) {
    mensaje.textContent = ' Hay campos marcados en rojo: revisa el mensaje debajo de cada uno antes de enviar.';
    mensaje.classList.add('error');
    if (firstInvalidField) {
      firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstInvalidField.focus();
    }
    return;
  }

  const submitBtn = form.querySelector('.btn-primary');
  submitBtn.disabled = true;

  try {
    const response = await fetch('/enviar', {
      method: 'POST',
      body: new FormData(form),
    });
    const data = await response.json();

    if (data.ok) {
      mensaje.textContent = ` ${data.mensaje}`;
      mensaje.classList.add('ok');
      form.reset();
      clearAllFieldStates();
    } else {
      mensaje.textContent = ` ${data.mensaje}`;
      mensaje.classList.add('error');
    }
  } catch (err) {
    mensaje.textContent = 'No se pudo enviar el reporte. Intenta de nuevo.';
    mensaje.classList.add('error');
  } finally {
    submitBtn.disabled = false;
  }
});
