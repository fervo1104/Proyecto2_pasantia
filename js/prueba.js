
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Configuración Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBwfXO2bKyXp7FpSCtLI--AEkf92V8tCXY",
  authDomain: "formulario-de-reportes-seguros.firebaseapp.com",
  projectId: "formulario-de-reportes-seguros",
  storageBucket: "formulario-de-reportes-seguros.firebasestorage.app",
  messagingSenderId: "755403677023",
  appId: "1:755403677023:web:9ebde31ce3def9ad852aea"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Validaciones
function soloNumeros(texto) {
  let esValido = true;
  for (let i = 0; i < texto.length; i++) {
    let caracter = texto[i];
    if (caracter < "0" || caracter > "9") {
      esValido = false;
    }
  }
  return esValido;
}

function soloLetras(texto) {
  let letrasPermitidas = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ áéíóúÁÉÍÓÚñÑ";
  let esValido = true;
  for (let i = 0; i < texto.length; i++) {
    let caracter = texto[i];
    if (letrasPermitidas.includes(caracter) === false) {
      esValido = false;
    }
  }
  return esValido;
}

// Limpiar errores cuando el usuario corrija
document.getElementById("cedula").addEventListener("input", function() {
  this.setCustomValidity("");
});

document.getElementById("nombre").addEventListener("input", function() {
  this.setCustomValidity("");
});

// Envío del formulario
document.getElementById("formulario").addEventListener("submit", async function (e) {
  e.preventDefault();

  var campoCedula = document.getElementById("cedula");
  var campoNombre = document.getElementById("nombre");

  if (!soloNumeros(campoCedula.value)) {
    campoCedula.setCustomValidity("Solo se permiten números en este campo");
    campoCedula.reportValidity();
    return;
  }

  if (!soloLetras(campoNombre.value)) {
    campoNombre.setCustomValidity("Solo se permiten letras en este campo");
    campoNombre.reportValidity();
    return;
  }

  document.getElementById("mensaje").textContent = "¡Reporte enviado correctamente!";
  document.getElementById("formulario").reset();
});