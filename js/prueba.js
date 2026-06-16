como ver los formularios montados?


  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDAKsga5hYbw5Kerp4ZUg1cRhsER5ti0g8",
    authDomain: "formulario-seguro-2.firebaseapp.com",
    projectId: "formulario-seguro-2",
    storageBucket: "formulario-seguro-2.firebasestorage.app",
    messagingSenderId: "518898164803",
    appId: "1:518898164803:web:57a1faf033d5c62f5f60f6",
    measurementId: "G-4ZK3HYT2JX"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);



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

