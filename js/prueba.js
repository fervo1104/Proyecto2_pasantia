
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