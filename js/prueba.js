

<<<<<<< HEAD
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
=======
    import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-analytics.js";

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
 const formulario = document.getElementById('formulario'); 
    formulario.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        const nombreValue = document.getElementById('nombre').value; 
        const correoValue = document.getElementById('correo').value;
        const telefonoValue = document.getElementById('telefono').value;
        const cedulaValue = document.getElementById('cedula').value;
        const edadValue = document.getElementById('edadOpciones').value;
            try { 
        // Comando para guardar datos 
                const docRef = await addDoc(collection(db, "Usuario"), { nombre: nombreValue, correo: correoValue, telefono: telefonoValue, cedula: cedulaValue, edad: edadValue }); 
                console.log("Documento guardado con ID: ", docRef.id);
                alert("Datos guardados correctamente"); 
                formulario.reset(); // Limpiar formulario 
            } catch (error) { 
                console.error("Error al guardar: ", error);
            }
    }); 

     const formulario = document.getElementById('formulario'); 
    formulario.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evitar que la página se recargue 
        const ubicacionValue = document.getElementById('ubiopciones').value; 
        const tipoIncidenteValue = document.getElementById('tipoIncidente').value;
        const distritoValue = document.getElementById('distrito').value;
        const cedulaValue = document.getElementById('cedula').value;
        const descripcionValue = document.getElementById('descripcion').value;
        const cantónValue = document.getElementById('cantón').value;
            try { 
        // Comando para guardar datos 
                const docRef = await addDoc(collection(db, "Usuario"), { ubicacion: ubicacionValue, tipoIncidente: tipoIncidenteValue, distrito: distritoValue, cedula: cedulaValue, descripcion: descripcionValue, cantón: cantónValue }); 
                console.log("Documento guardado con ID: ", docRef.id);
                alert("Datos guardados correctamente"); 
                formulario.reset(); // Limpiar formulario 
            } catch (error) { 
                console.error("Error al guardar: ", error);
            }
    }); 




import {encryptData } from './crypto';


document.addEventListener('DOMContentLoaded',()=>{

    

    const Form = document.getElementById('formulario');
    Form.addEventListener('submit', async(event)=>{ 

        event.preventDefault();
        console.log('Formulario enviado - precesando datos... ');
        const cedula = document.getElementById('cedula').value;
        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
        const númteléfono = document.getElementById('telefono').value;
        const dirreción = document.getElementById('dirreción');
        const ubicación = document.getElementById('ubiopciones');
        const seguro = document.getElementById('seguro');
        const edad = document.getElementById('edadOpciones');
        const tipoincidente = document.getElementById('tipoIncidente');
        const descripcion = document.getElementById('descripcion');




        const ferKey = "llave";
        const cedulaEncriptado = await encryptData(cedula,ferKey);
        const nombreEncriptado = await encryptData(nombre,ferKey);
        const correoEncriptado = await encryptData(correo, ferKey);
        const teléfonoEncriptado = await encryptData(númteléfono, ferKey);
        const direcciónEncriptado = await encryptData(dirreción, ferKey);
        const ubicaciónEncriptado = await encryptData(ubicación, ferKey);
        const seguroEncriptado = await encryptData(seguro, ferKey);
        const edadEncriptado = await encryptData(edad, ferKey);
        const tipoIncidenteEncriptado = await encryptData(tipoincidente, ferKey);
        const descripcionEncriptado = await encryptData(descripcion, ferKey);

        formResult.innerHTML = `
                    <br><br>
                    <strong>Datos protegidos exitosamente</strong><br><br>
                
                    <strong>Nombre Encriptado:</strong><br>
                    <div style="font-size: 11px; background: white; padding: 8px; border-radius: 4px; margin-top: 5px; word-break: break-all;">
                        ${nombreEncriptado}
                    </div>
                    
                    <strong>Correo encriptado:</strong><br>
                    <div style="font-size: 11px; background: white; padding: 8px; border-radius: 4px; margin-top: 5px; word-break: break-all;">
                        ${correoEncriptado}
                    </div>
                 
                    

                    
                    
                `;

    });    
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
>>>>>>> 9c51e765e4271511b34421df2a83736f230a8efc
