from flask import Flask, send_from_directory, abort
import os

app = Flask(__name__)

# Ruta donde está el archivo
CARPETA_DESCARGAS = "/root/Proyecto2_pasantia/data"

@app.route("/descargar/reportes2.txt", methods=["GET"])
def descargar_archivo():
    try:
        return send_from_directory(
            CARPETA_DESCARGAS,
            "reportes2.txt",
            as_attachment=True
        )
    except FileNotFoundError:
        abort(404, description="El archivo no existe")

if __name__ == "__main__":
    app.run(host="172.233.177.244", port=5000, debug=True)