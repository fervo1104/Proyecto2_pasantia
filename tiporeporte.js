const platos = [
    {
        nombre: "Alcantarillado Sanitario",
        descripcion: "Sistema encargado de recolectar y transportar aguas residuales domésticas e industriales."
    },
    {
        nombre: "Alcantarillado Pluvial",
        descripcion: "Sistema diseñado para recoger y conducir las aguas de lluvia."
    },
    {
        nombre: "Alcantarillado Combinado",
        descripcion: "Sistema que transporta conjuntamente aguas residuales y aguas pluviales."
    }
];

// Cargar opciones en el menú desplegable
const selectPlatos = document.getElementById("selectPlatos");

platos.forEach((plato, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = plato.nombre;
    selectPlatos.appendChild(option);
});

// Mostrar detalles al seleccionar una opción
function mostrarDetallesPlato() {
    const indice = selectPlatos.value;
    const detalles = document.getElementById("detallesPlato");

    if (indice === "") {
        detalles.innerHTML = "";
        return;
    }

    detalles.innerHTML = `
        <h3>${platos[indice].nombre}</h3>
        <p>${platos[indice].descripcion}</p>
    `;
}