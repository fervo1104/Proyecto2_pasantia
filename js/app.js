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



import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-analytics.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";
import { encryptData } from "./crypto.js";

const firebaseConfig = {
  apiKey: "AIzaSyDAKsga5hYbw5Kerp4ZUg1cRhsER5ti0g8",
  authDomain: "formulario-seguro-2.firebaseapp.com",
  projectId: "formulario-seguro-2",
  storageBucket: "formulario-seguro-2.firebasestorage.app",
  messagingSenderId: "518898164803",
  appId: "1:518898164803:web:57a1faf033d5c62f5f60f6",
  measurementId: "G-4ZK3HYT2JX"
};

const app = initializeApp(firebaseConfig);
let analytics;
try { analytics = getAnalytics(app); } catch (_) {}
const db = getFirestore(app);

const MASTER_PASSWORD = "123";

window.verificarAcceso = function () {
  window.location.href = "../html/admin.html";
};

function soloNumeros(texto) {
  for (let i = 0; i < texto.length; i++) {
    if (texto[i] < "0" || texto[i] > "9") return false;
  }
  return true;
}

function soloLetras(texto) {
  const permitidas = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ áéíóúÁÉÍÓÚñÑ";
  for (let i = 0; i < texto.length; i++) {
    if (!permitidas.includes(texto[i])) return false;
  }
  return true;
}

document.getElementById("cedula").addEventListener("input", function () {
  this.setCustomValidity("");
});

document.getElementById("nombre").addEventListener("input", function () {
  this.setCustomValidity("");
});

document.getElementById("formulario").addEventListener("submit", async function (e) {
  e.preventDefault();

  const campoCedula = document.getElementById("cedula");
  const campoNombre = document.getElementById("nombre");
  const mensaje = document.getElementById("mensaje");

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


  try {
    const [cedula, nombre, correo, telefono, direccion, descripcion] = await Promise.all([
      encryptData(campoCedula.value, MASTER_PASSWORD),
      encryptData(campoNombre.value, MASTER_PASSWORD),
      encryptData(document.getElementById("correo").value, MASTER_PASSWORD),
      encryptData(document.getElementById("telefono").value, MASTER_PASSWORD),
      encryptData(document.getElementById("direccion").value, MASTER_PASSWORD),
      encryptData(document.getElementById("descripcion").value, MASTER_PASSWORD),
    ]);

    await addDoc(collection(db, "formularios"), {
      tipoIdentificacion: document.getElementById("tipoIdentificacion").value,
      cedula,
      nombre,
      correo,
      telefono,
      direccion,
      provincia: document.getElementById("provincia").value,
      distrito: document.getElementById("distrito").value,
      canton: document.getElementById("canton").value,
      seguro: document.getElementById("seguro").value,
      edadOpciones: document.getElementById("edadOpciones").value,
      tipoIncidente: document.getElementById("tipoIncidente").value,
      descripcion,
      fecha: new Date().toISOString(),
    });

    mensaje.textContent = "Reporte enviado exitosamente.";
    mensaje.style.color = "green";
    this.reset();
  } catch (error) {
    console.error("Error al enviar el formulario:", error);
    mensaje.textContent = "Error al enviar el reporte. Intenta de nuevo.";
    mensaje.style.color = "red";
  }
});
