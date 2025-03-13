// JavaScript para el menú hamburguesa
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('show'); // Alterna la clase 'show' para mostrar/ocultar el menú
});


// Cargar los productos desde el archivo JSON
const cargarProductos = async () => {
    try {
        const respuesta = await fetch('productos.json');
        const datos = await respuesta.json();

        // Función para mostrar productos
        const mostrarProductos = (categoria, selector) => {
            const contenedor = document.querySelector(selector);
            categoria.forEach(producto => {
                const productoHTML = `
                    <div class="producto">
                        <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img">
                        <h4>${producto.nombre}</h4>
                        <p>${producto.descripcion}</p>
                        <p><strong>${producto.precio}</strong></p>
                    </div>
                `;
                contenedor.innerHTML += productoHTML;
            });
        };

        // Mostrar productos por categorías
        mostrarProductos(datos.limpiezaInterior, '#limpieza-interior .productos');
        mostrarProductos(datos.cuidadoExterior, '#cuidado-exterior .productos');
        mostrarProductos(datos.productosGenerales, '#productos-generales .productos');
        mostrarProductos(datos.accesoriosVehiculo, '#accesorios-vehiculo .productos');

    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
};

cargarProductos();

document.addEventListener('DOMContentLoaded', () => {
    // Cargar los productos desde el archivo JSON
    fetch('productos.json')
        .then(response => response.json())
        .then(data => mostrarProductoAleatorio(data))
        .catch(error => console.error('Error al cargar los productos:', error));
});

let productos = [];

// Función para mostrar un producto aleatorio cada cierto tiempo
function mostrarProductoAleatorio(data) {
    productos = data.limpiezaInterior.concat(data.cuidadoExterior, data.productosGenerales, data.accesorios); // Agregar todas las categorías

    let currentProductIndex = 0;
    
    // Función que actualiza el producto visible
    function actualizarProducto() {
        const producto = productos[currentProductIndex];
        const productoContainer = document.getElementById('producto-container');
        
        // Crear el contenido del producto
        productoContainer.innerHTML = `
            <div class="producto-imagen">
                <img src="${producto.imagen}" alt="${producto.nombre}">
            </div>
            <div class="producto-descripcion">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p><strong>Precio:</strong> ${producto.precio}</p>
            </div>
        `;
        
        // Incrementar el índice del producto y reiniciarlo si es necesario
        currentProductIndex = (currentProductIndex + 1) % productos.length;
    }

    // Actualizar el producto cada 5 segundos
    setInterval(actualizarProducto, 5000);

    // Mostrar el primer producto al cargar la página
    actualizarProducto();
}
