/**
 * Convierte un ArrayBuffer/Uint8Array a Base64
 */
const arrayBufferToBase64 = (buffer) => {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
};

/**
 * Convierte un string Base64 a Uint8Array
 */
const base64ToArrayBuffer = (base64) => {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
};

/**
 * Deriva una clave AES-GCM a partir de una contraseña y un salt usando PBKDF2
 */
const getKeyFromPassword = async (password, salt) => {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
        'raw',
        encoder.encode(password),
        { name: 'PBKDF2' },
        false,
        ['deriveKey']
    );

    return crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: salt,
            iterations: 100000,
            hash: 'SHA-256'
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
    );
};

/**
 * Encripta un texto plano
 * @param {string} plainText - El texto a encriptar
 * @param {string} masterPassword - La contraseña maestra
 * @returns {Promise<string>} - Cadena en Base64 que contiene: salt.iv.ciphertext
 */
export const encryptData = async (plainText, masterPassword) => {
    try {
        const encoder = new TextEncoder();
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const salt = crypto.getRandomValues(new Uint8Array(16));

        const key = await getKeyFromPassword(masterPassword, salt);

        const encodedText = encoder.encode(plainText);

        const encryptedContent = await crypto.subtle.encrypt(
            {
                name: 'AES-GCM',
                iv: iv
            },
            key,
            encodedText
        );

        const saltBase64 = arrayBufferToBase64(salt);
        const ivBase64 = arrayBufferToBase64(iv);
        const ciphertextBase64 = arrayBufferToBase64(encryptedContent);

        return `${saltBase64}.${ivBase64}.${ciphertextBase64}`;
    } catch (error) {
        console.error('Error en encriptación:', error);
        throw new Error('No se pudo encriptar el dato');
    }
};

/**
 * Desencripta una cadena generada por encryptData
 * @param {string} encryptedData - Cadena en formato salt.iv.ciphertext (Base64)
 * @param {string} masterPassword - La contraseña maestra usada para encriptar
 * @returns {Promise<string>} - El texto plano original
 */
export const decryptData = async (encryptedData, masterPassword) => {
    try {
        const [saltBase64, ivBase64, ciphertextBase64] = encryptedData.split('.');

        const salt = base64ToArrayBuffer(saltBase64);
        const iv = base64ToArrayBuffer(ivBase64);
        const ciphertext = base64ToArrayBuffer(ciphertextBase64);

        const key = await getKeyFromPassword(masterPassword, salt);

        const decryptedContent = await crypto.subtle.decrypt(
            {
                name: 'AES-GCM',
                iv: iv
            },
            key,
            ciphertext
        );

        const decoder = new TextDecoder();
        return decoder.decode(decryptedContent);
    } catch (error) {
        console.error('Error en desencriptación:', error);
        throw new Error('No se pudo desencriptar el dato');
    }
};

/**
 * Genera un hash SHA-256 de un texto (no reversible, útil para datos que solo necesitan compararse)
 * @param {string} text
 * @returns {Promise<string>} - Hash en hexadecimal
 */
export const hashPassword = async (text) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};
