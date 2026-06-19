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

 const formulario = document.getElementById('formulario'); 
    formulario.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        const nombreValue = document.getElementById('nombre').value;
        const correoValue = document.getElementById('correo').value;
        const telefonoValue = document.getElementById('telefono').value;
        const cedulaValue = document.getElementById('cedula').value;
        const edadValue = document.getElementById('edadOpciones').value;
        const direccionValue = document.getElementById('direccion').value;
        const ubicacionValue = document.getElementById('ubiopciones').value;
        const cantonValue = document.getElementById('cantón').value;
        const distritoValue = document.getElementById('distrito').value;
        const seguroValue = document.getElementById('seguro').value;
        const tipoIncidenteValue = document.getElementById('tipoIncidente').value;
        const descripcionValue = document.getElementById('descripcion').value;
            try {
                const docRef = await addDoc(collection(db, "Usuario"), { nombre: nombreValue, correo: correoValue, telefono: telefonoValue, cedula: cedulaValue, edad: edadValue, direccion: direccionValue, ubicacion: ubicacionValue, canton: cantonValue, distrito: distritoValue, seguro: seguroValue, tipoIncidente: tipoIncidenteValue, descripcion: descripcionValue });
                console.log("Documento guardado con ID: ", docRef.id);
                alert("Datos guardados correctamente"); 
                formulario.reset(); // Limpiar formulario 
            } catch (error) { 
                console.error("Error al guardar: ", error);
            }
    }); 
 const formulario = document.getElementById('formulario'); 
    formulario.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        const TipoidentificaciónValue = document.getElementById('tipoIdentificacion').value;
        const NúmeroidentificaciónValue = document.getElementById('cedula').value;
        const direccionValue = document.getElementById('direccion').value;
        const ubicacionValue = document.getElementById('ubiopciones').value;
        const cantonValue = document.getElementById('cantón').value;
        const distritoValue = document.getElementById('distrito').value;
        const seguroValue = document.getElementById('seguro').value;
        const tipoIncidenteValue = document.getElementById('tipoIncidente').value;
        const descripcionValue = document.getElementById('descripcion').value;
            try {
                const docRef = await addDoc(collection(db, "Usuario"), { nombre: nombreValue, correo: correoValue, telefono: telefonoValue, cedula: cedulaValue, edad: edadValue, direccion: direccionValue, ubicacion: ubicacionValue, canton: cantonValue, distrito: distritoValue, seguro: seguroValue, tipoIncidente: tipoIncidenteValue, descripcion: descripcionValue });
                console.log("Documento guardado con ID: ", docRef.id);
                alert("Datos guardados correctamente"); 
                formulario.reset(); // Limpiar formulario 
            } catch (error) { 
                console.error("Error al guardar: ", error);
            }
    });





function verificarAcceso() {
    const contrasena = prompt("Ingresa la contraseña:");
    const usuario = prompt("Ingresa el usuario:");
    if (contrasena === "proyecto2" && usuario === "admin123") {
        window.location.href = "../html/admin.html"; // ajusta la ruta si es necesario
    } else {
        alert("Contraseña o usuario incorrecto.");
    }
}

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

