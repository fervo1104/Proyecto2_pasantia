
import { hashPassword, encryptData, decryptData } from '../js/crypto.js';


document.addEventListener('DOMContentLoaded',()=>{

    

    const Form = document.getElementById('formulario');
    Form.addEventListener('submit', async(event)=>{ 

        event.preventDefault();
        console.log('Formulario enviado - precesando datos... ');
        const cedula = document.getElementById('cedula').value;
        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
        const telefono = document.getElementById('telefono').value;
        const dirrecion = document.getElementById('direccion').value;
        const ubicacion = document.getElementById('ubiopciones').value;
        const seguro = document.getElementById('seguro').value;
        const edad = document.getElementById('edadOpciones').value;
        const tipoIncidente = document.getElementById('tipoIncidente').value;


        const ferKey = "ProfNoEntiendoAYUDA";
        const cedulaEncriptado = await encryptData(cedula,ferKey);
        const nombreEncriptado = await encryptData(nombre,ferKey);
        const correoEncriptado = await encryptData(correo,ferKey);
        const telefonoEncriptado = await encryptData(telefono,ferKey);
        const direccionEncriptado = await encryptData(dirrecion,ferKey);
        const ubicacionEncriptado = await encryptData(ubicacion,ferKey);
        const seguroEncriptado = await encryptData(seguro,ferKey);
        const edadEncriptado = await encryptData(edad,ferKey);
        const tipoIncidenteEncriptado = await encryptData(tipoIncidente,ferKey);
        

        
        


        const mensaje = document.getElementById('mensaje');
        mensaje.innerHTML = `
                    <br><br>
                    <strong>Datos protegidos exitosamente</strong><br><br>

                    <strong>Cédula encriptada:</strong><br>
                    <div style="font-size: 11px; background: white; padding: 8px; border-radius: 4px; margin-top: 5px; word-break: break-all;">
                        ${cedulaEncriptado}
                    </div>
                    <br>
                    <strong>Nombre encriptado:</strong><br>
                    <div style="font-size: 11px; background: white; padding: 8px; border-radius: 4px; margin-top: 5px; word-break: break-all;">
                        ${nombreEncriptado}
                    </div>
                    <br>
                    <strong>Correo encriptado:</strong><br>
                    <div style="font-size: 11px; background: white; padding: 8px; border-radius: 4px; margin-top: 5px; word-break: break-all;">
                        ${correoEncriptado}
                    </div>
                `;

        addDoc(collection(db, 'reportes'), {
            cedula: cedulaEncriptado,
            nombre: nombreEncriptado,
            correo: correoEncriptado,
            telefono: telefonoEncriptado,
            direccion: direccionEncriptado,
            ubicacion: ubicacionEncriptado,
            seguro: seguroEncriptado,
            edad: edadEncriptado,
            tipoIncidente: tipoIncidenteEncriptado,
            fecha: new Date().toISOString()
        });

    });




    
});


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 2. Tu configuración
const firebaseConfig = {
  apiKey: "AIzaSyBwfXO2bKyXp7FpSCtLI--AEkf92V8tCXY",
  authDomain: "formulario-de-reportes-seguros.firebaseapp.com",
  projectId: "formulario-de-reportes-seguros",
  storageBucket: "formulario-de-reportes-seguros.firebasestorage.app",
  messagingSenderId: "755403677023",
  appId: "1:755403677023:web:9ebde31ce3def9ad852aea"
};

// 3. Inicializar
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 4. Aquí abajo va el resto de tu lógica (cifrado + envío del formulario)