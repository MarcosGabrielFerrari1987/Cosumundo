// Seleccionamos elementos
const botonesComprar = document.querySelectorAll("button.button");
const listaCarrito = document.getElementById("lista-carrito");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

let carrito = [];

// Función para actualizar la visualización del carrito
function mostrarCarrito() {
  listaCarrito.innerHTML = "";

  let total = 0;
  carrito.forEach((producto, index) => {
    total += producto.precio * producto.cantidad;

    const li = document.createElement("li");
    li.textContent = `${
      producto.nombre
    } - $${producto.precio.toLocaleString()} x ${producto.cantidad}`;
    listaCarrito.appendChild(li);
  });

  if (carrito.length > 0) {
    const totalLi = document.createElement("li");
    totalLi.innerHTML = `<strong>Total: $${total.toLocaleString()}</strong>`;
    listaCarrito.appendChild(totalLi);
  }
}

// Función para agregar producto al carrito
function agregarAlCarrito(nombre, precio) {
  const productoExistente = carrito.find((p) => p.nombre === nombre);
  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }
  mostrarCarrito();
}

// Asignamos eventos a los botones
botonesComprar.forEach((boton) => {
  boton.addEventListener("click", () => {
    const li = boton.parentElement;
    const nombre = li.querySelector("p").textContent;
    const precioTexto = li.querySelector("p.precio").textContent;
    const precio = parseInt(precioTexto.replace(/\D/g, ""), 10); // elimina $ y puntos

    agregarAlCarrito(nombre, precio);
  });
});

// Vaciar carrito
vaciarCarritoBtn.addEventListener("click", () => {
  carrito = [];
  mostrarCarrito();
});
