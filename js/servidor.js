
import { encryptData, decryptData } from "./crypto.js";

const MASTER_PASSWORD = "123";


const cedula = await encryptData(
    document.getElementById("cedula").value,
    MASTER_PASSWORD
);

const nombre = await encryptData(
    document.getElementById("nombre").value,
    MASTER_PASSWORD
);

const correo = await encryptData(
    document.getElementById("correo").value,
    MASTER_PASSWORD
);

const telefono = await encryptData(
    document.getElementById("telefono").value,
    MASTER_PASSWORD
);

const direccion = await encryptData(
    document.getElementById("direccion").value,
    MASTER_PASSWORD
);

const descripcion = await encryptData(
    document.getElementById("descripcion").value,
    MASTER_PASSWORD
);


import { decryptData } from "./crypto.js";

const nombreReal = await decryptData(
    nombreEncriptado,
    MASTER_PASSWORD
);