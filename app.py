

import os
import re
import socket
from datetime import datetime, timezone

from cryptography.fernet import Fernet
from flask import Flask, render_template, request, jsonify

try:
    import colorama
    colorama.init(autoreset=True)
    COLOR_GREEN = colorama.Fore.GREEN + colorama.Style.BRIGHT
    COLOR_RESET = colorama.Style.RESET_ALL
except ImportError:
    COLOR_GREEN = ""
    COLOR_RESET = ""

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
DATA_FILE = os.path.join(DATA_DIR, "reportes.txt")
DATA_FILE_SIN_CIFRAR = os.path.join(DATA_DIR, "reportes2.txt")
KEY_FILE = os.path.join(BASE_DIR, "secret.key")

GUARDAR_SIN_CIFRAR = True

app = Flask(__name__)

PROVINCIAS = {"San José", "Alajuela", "Heredia", "Cartago", "Puntarenas", "Guanacaste", "Limón"}
TIPOS_IDENTIFICACION = {"nacional", "extranjero", "pasaporte"}
TIPOS_INCIDENTE = {
    "Calles y Carreteras",
    "Luz, Agua y Electricidad",
    "Parques y Áreas Verdes",
    "Edificios y Construcciones",
    "Inundaciones y Drenajes",
    "Situaciones de Peligro",
    "Teléfono e Internet",
    "Otro",
}

FIELD_RULES = {
    "tipo_identificacion": {"choices": TIPOS_IDENTIFICACION},
    "numero_identificacion": {"pattern": r"^[A-Za-z0-9]{5,20}$"},
    "nombre": {"pattern": r"^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{2,80}$"},
    "correo": {"pattern": r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"},
    "telefono": {"pattern": r"^[0-9+\- ]{7,20}$"},
    "direccion": {"pattern": r"^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 .,#\-/]{5,200}$"},
    "provincia": {"choices": PROVINCIAS},
    "canton": {"pattern": r"^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{2,60}$"},
    "distrito": {"pattern": r"^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{2,60}$"},
    "tipo_incidente": {"choices": TIPOS_INCIDENTE},
    "descripcion": {"pattern": r"^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9 .,;:¡!¿?\-\n]{10,1000}$"},
}

FIELD_ORDER = list(FIELD_RULES.keys())


def get_local_ip():
    #Obtiene la IP de esta máquina en la red local no ocupa conexión real a internet
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("8.8.8.8", 20))
        return s.getsockname()[0]
    except OSError:
        return "127.0.0.1"
    finally:
        s.close()


def get_fernet():
    if not os.path.exists(KEY_FILE):
        key = Fernet.generate_key()
        with open(KEY_FILE, "wb") as f:
            f.write(key)
    with open(KEY_FILE, "rb") as f:
        key = f.read()
    return Fernet(key)

#importante
def validate_field(name, value):
    rule = FIELD_RULES[name]
    value = (value or "").strip()

    if "choices" in rule:
        if value not in rule["choices"]:
            return None, f"Valor inválido para '{name}'."
        return value, None
#f pone el ofrmato al string
    if not re.match(rule["pattern"], value):
        return None, f"El campo '{name}' contiene caracteres no permitidos o longitud inválida."

    return value, None


def validate_form(data):
    clean = {}
    for field in FIELD_ORDER:
        value, error = validate_field(field, data.get(field, ""))
        if error:
            return None, error
        clean[field] = value
    return clean, None
# conexion con la ip osea la ruta
@app.route("/")
def index():
    return render_template(
        "index.html",
        provincias=sorted(PROVINCIAS),
        tipos_incidente=sorted(TIPOS_INCIDENTE),
    )


@app.route("/enviar", methods=["POST"])
def enviar():
    data = request.form.to_dict()

    clean, error = validate_form(data)
    if error:
        return jsonify({"ok": False, "mensaje": error}), 400

    fernet = get_fernet()
    timestamp = datetime.now(timezone.utc).isoformat()
    encrypted_values = [fernet.encrypt(timestamp.encode()).decode()]
    for field in FIELD_ORDER:
        token = fernet.encrypt(clean[field].encode()).decode()
        encrypted_values.append(token)

    os.makedirs(DATA_DIR, exist_ok=True)
    with open(DATA_FILE, "a", encoding="utf-8") as f:
        f.write(",".join(encrypted_values) + "\n")

    if GUARDAR_SIN_CIFRAR:
        plain_values = [timestamp] + [clean[field] for field in FIELD_ORDER]
        with open(DATA_FILE_SIN_CIFRAR, "a", encoding="utf-8") as f:
            f.write(",".join(plain_values) + "\n")

    return jsonify({"ok": True, "mensaje": "Reporte enviado y protegido correctamente."})


if __name__ == "__main__":
    # host 0.0.0.0 hace que escuche en todas las interfaces de red de la
    # máquina (local o pública), sin necesidad de fijar una IP en el código.
    # debug solo se activa por variable de entorno: nunca debe estar
    # encendido si la máquina es accesible por IP pública, ya que expone
    # un debugger interactivo capaz de ejecutar código arbitrario.
    debug_mode = os.environ.get("FLASK_DEBUG", "0") == "1"
    port = 5000

    # Con el reloader de debug activo, este script se ejecuta dos veces
    # (proceso vigilante + proceso real). Solo el proceso real define
    # WERKZEUG_RUN_MAIN, así que el aviso se imprime una sola vez.
    if not debug_mode or os.environ.get("WERKZEUG_RUN_MAIN") == "true":
        local_ip = get_local_ip()
        print(f"\n{COLOR_GREEN}Conéctate a este formulario desde cualquier dispositivo de la misma red en:{COLOR_RESET}")
        print(f"{COLOR_GREEN}  -> http://{local_ip}:{port}/{COLOR_RESET}")
        print(f"{COLOR_GREEN}(o http://127.0.0.1:{port}/ si es desde esta misma máquina){COLOR_RESET}\n")

    app.run(host="0.0.0.0", port=port, debug=debug_mode)
