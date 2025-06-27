// Get DOM elements for inputs and buttons
const $id = document.getElementById("id");
const $nombre = document.getElementById("name");
const $precio = document.getElementById("price");
const $button = document.getElementById("button");
const $buttonActualizar = document.getElementById("button-actualizar");
const $buttonEliminar = document.getElementById("button-eliminar");

// Initialize products object with some default products
let productos = {
  1: { id: 1, nombre: "laptop", precio: 1500 },
  2: { id: 2, nombre: "Mouse", precio: 250 },
  3: { id: 3, nombre: "teclado", precio: 500 }
};

// Display products on initial load
mostrarProductos();
// Configure SweetAlert2 toast notifications
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

// ADD PRODUCT functionality
$button.addEventListener("click", () => {
  // Get and trim input values
  const id = $id.value.trim();
  const nombre = $nombre.value.trim();
  const precio = parseFloat($precio.value.trim());
  // Validate inputs
  if (!id || !nombre || isNaN(precio)) {
    return Swal.fire({
      title: "Todos los campos son obligatorios",
      icon: "warning",
      timer: 2000,
      showConfirmButton: false
   })
  }

   // Check for duplicate product by name
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
// Add product to productos object
  productos[id] = { id, nombre, precio };

// Show success message and update product list
  Swal.fire("Producto guardado!", "", "success");
  mostrarProductos();
  limpiarCampos();
});

// UPDATE PRODUCT functionality
$buttonActualizar.addEventListener("click", () => {
  // Get and trim input values
  const id = $id.value.trim();
  const nombre = $nombre.value.trim();
  const precio = parseFloat($precio.value.trim());

  // Check if product exists by ID
  if (!productos[id]) {
    return Swal.fire({
      title: "Producto no encontrado",
      icon: "error",
      timer: 2000,
      showConfirmButton: false
   })
  }

  // Check if another product already has the same name
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
 // Update product name and price
  productos[id].nombre = nombre;
  productos[id].precio = precio;

  // Show success message and update product list
  Swal.fire({
      title: "Producto actualizado",
      icon: "info",
      timer: 2000,
      showConfirmButton: false
   })
  mostrarProductos();
  limpiarCampos();
});

// DELETE PRODUCT functionality
$buttonEliminar.addEventListener("click", () => {
  // DELETE PRODUCT functionality
  const id = $id.value.trim();
 // Check if product exists
  if (!productos[id]) {
    return Swal.fire("Producto no encontrado", "", "error");
  }
// Delete product from productos object
  delete productos[id];
  // Show success message and update product list
   Swal.fire({
      title: "Producto eliminado",
      icon: "success",
      timer: 2000,
      showConfirmButton: false
   })
  mostrarProductos();
  limpiarCampos();
});

// DISPLAY PRODUCTS function
function mostrarProductos() {
  let contenedor = document.getElementById("productos-lista");
  let html = "<h2>Productos:</h2><ul>";
// Loop through products and create list items
  for (let key in productos) {
    const p = productos[key];
    html += `<li>ID: ${p.id}, Nombre: ${p.nombre}, Precio: $${p.precio}</li>`;
  }

  html += "</ul>";
  contenedor.innerHTML = html;
}

// CLEAR INPUT FIELDS function
function limpiarCampos() {
  $id.value = "";
  $nombre.value = "";
  $precio.value = "";
}
