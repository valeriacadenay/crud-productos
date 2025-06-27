const $id = document.getElementById("id");
const $nombre = document.getElementById("name");
const $precio = document.getElementById("price");
const $button = document.getElementById("button");
const $buttonActualizar = document.getElementById("button-actualizar");
const $buttonEliminar = document.getElementById("button-eliminar");

let productos = {
  1: { id: 1, nombre: "laptop", precio: 1500 },
  2: { id: 2, nombre: "Mouse", precio: 250 },
  3: { id: 3, nombre: "teclado", precio: 500 }
};

// Mostrar productos al inicio
mostrarProductos();

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

// AGREGAR PRODUCTO
$button.addEventListener("click", () => {
  const id = $id.value.trim();
  const nombre = $nombre.value.trim();
  const precio = parseFloat($precio.value.trim());

  if (!id || !nombre || isNaN(precio)) {
    return Swal.fire({
      title: "Todos los campos son obligatorios",
      icon: "warning",
      timer: 2000,
      showConfirmButton: false
   })
  }

  // Verificar duplicado por nombre
  const existe = Object.values(productos).some(
    p => p.nombre.toLowerCase() === nombre.toLowerCase()
  );

  if (existe) {
    return Swal.fire({
      title: "El producto ya existe",
      icon: "error",
      timer: 2000,
      showConfirmButton: false
   })
  }

  productos[id] = { id, nombre, precio };

  Swal.fire("Producto guardado!", "", "success");
  mostrarProductos();
  limpiarCampos();
});

// ACTUALIZAR PRODUCTO
$buttonActualizar.addEventListener("click", () => {
  const id = $id.value.trim();
  const nombre = $nombre.value.trim();
  const precio = parseFloat($precio.value.trim());

  if (!productos[id]) {
    return Swal.fire({
      title: "Producto no encontrado",
      icon: "error",
      timer: 2000,
      showConfirmButton: false
   })
  }

  // Verifica si ya existe otro con el mismo nombre
  const duplicado = Object.values(productos).some(
    p => p.nombre.toLowerCase() === nombre.toLowerCase() && p.id != id
  );
  if (duplicado) {
    return Swal.fire({
      title: "Otro producto ya tiene ese nombre",
      icon: "error",
      timer: 2000,
      showConfirmButton: false
   });
  }

  productos[id].nombre = nombre;
  productos[id].precio = precio;

  Swal.fire({
      title: "Producto actualizado",
      icon: "info",
      timer: 2000,
      showConfirmButton: false
   })
  mostrarProductos();
  limpiarCampos();
});

// ELIMINAR PRODUCTO
$buttonEliminar.addEventListener("click", () => {
  const id = $id.value.trim();

  if (!productos[id]) {
    return Swal.fire("Producto no encontrado", "", "error");
  }

  delete productos[id];
   Swal.fire({
      title: "Producto eliminado",
      icon: "success",
      timer: 2000,
      showConfirmButton: false
   })
  mostrarProductos();
  limpiarCampos();
});

// MOSTRAR PRODUCTOS
function mostrarProductos() {
  let contenedor = document.getElementById("productos-lista");
  let html = "<h2>Productos:</h2><ul>";

  for (let key in productos) {
    const p = productos[key];
    html += `<li>ID: ${p.id}, Nombre: ${p.nombre}, Precio: $${p.precio}</li>`;
  }

  html += "</ul>";
  contenedor.innerHTML = html;
}

//LIMPIAR CAMPOS
function limpiarCampos() {
  $id.value = "";
  $nombre.value = "";
  $precio.value = "";
}
