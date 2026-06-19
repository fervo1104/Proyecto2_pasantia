
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-analytics.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

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
const analytics = getAnalytics(app);
const db = getFirestore(app);

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

  const tipoIdentificacion = document.getElementById("tipoIdentificacion").value;
  const cedula = document.getElementById("cedula").value;
  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const telefono = document.getElementById("telefono").value;
  const edad = document.getElementById("edadOpciones").value;
  const direccion = document.getElementById("direccion").value;
  const provincia = document.getElementById("provincia").value;
  const canton = document.getElementById("canton").value;
  const distrito = document.getElementById("distrito").value;
  const seguro = document.getElementById("seguro").value;
  const tipoIncidente = document.getElementById("tipoIncidente").value;
  const descripcion = document.getElementById("descripcion").value;

  try {
    console.log("Guardando en Usuario...", {
      tipoIdentificacion,
      cedula,
      nombre,
      correo,
      telefono,
      edad,
      direccion
    });

    const usuarioRef = await addDoc(collection(db, "Usuario"), {
      tipoIdentificacion,
      cedula,
      nombre,
      correo,
      telefono,
      edad,
      direccion
    });
    console.log("Usuario guardado con ID:", usuarioRef.id);

    console.log("Guardando en Reporte...", {
      cedula,
      provincia,
      canton,
      distrito,
      seguro,
      tipoIncidente,
      descripcion
    });

    const reporteRef = await addDoc(collection(db, "Reporte"), {
      cedula,
      provincia,
      canton,
      distrito,
      seguro,
      tipoIncidente,
      descripcion
    });
    console.log("Reporte guardado con ID:", reporteRef.id);

    document.getElementById("mensaje").textContent = "¡Reporte enviado correctamente!";
    document.getElementById("formulario").reset();
  } catch (error) {
    console.error("Error completo:", error);
    console.error("Código de error:", error.code);
    console.error("Mensaje:", error.message);
    document.getElementById("mensaje").textContent = `Error: ${error.message}`;
  }
});

function verificarAcceso() {
  const usuario = prompt("Ingresa el usuario:");
  const contrasena = prompt("Ingresa la contraseña:");
  if (usuario === "admin123" && contrasena === "proyecto2") {
    window.location.href = "../html/admin.html";
  } else {
    alert("Contraseña o usuario incorrecto.");
  }
}

window.verificarAcceso = verificarAcceso;




