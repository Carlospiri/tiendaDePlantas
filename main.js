//Array de plantas
let plants = [
  {
    id: 1,
    nombre: "Albahaca",
    img: "images/albahaca.jpg",
    descripcion: "Planta aromatica especial para pizzas",
    precio: 10,
    stock: 20,
    cantidad: 1,
  },

  {
    id: 2,
    nombre: "Azucena",
    img: "images/azucena.png",
    descripcion: "Hermosa planta decorativa",
    precio: 8,
    stock: 20,
    cantidad: 1,
  },

  {
    id: 3,
    nombre: "Cilantro",
    img: "images/cilantro.jpg",
    descripcion: "Planta aromatica para tus comidas",
    precio: 3,
    stock: 20,
    cantidad: 1,
  },

  {
    id: 4,
    nombre: "Estrella de las nieves",
    img: "images/estrelladelasnieves.jpg",
    descripcion: "Planta endemica de Sierra Nevada",
    precio: 100,
    stock: 3,
    cantidad: 1,
  },

  {
    id: 5,
    nombre: "Margarita",
    img: "images/margarita.jpg",
    descripcion: "Clasica planta para decorar",
    precio: 4,
    stock: 20,
    cantidad: 1,
  },

  {
    id: 6,
    nombre: "Pensamientos",
    img: "images/pensamientos.jpg",
    descripcion: "Recoge tus ideas con esta planta",
    precio: 4,
    stock: 20,
    cantidad: 1,
  },

  {
    id: 7,
    nombre: "Rosal",
    img: "images/rosal.jpg",
    descripcion: "Decora tu jardin con esta planta",
    precio: 10,
    stock: 20,
    cantidad: 1,
  },

  {
    id: 8,
    nombre: "Tomates Cherry",
    img: "images/tomatescherry.jpg",
    descripcion: "Dale a tus platos un toque de color sabroso",
    precio: 9,
    stock: 20,
    cantidad: 1,
  },

  {
    id: 9,
    nombre: "Tomillo",
    img: "images/tomillo.jpg",
    descripcion: "Planta aromatica",
    precio: 10,
    stock: 20,
    cantidad: 1,
  },
];
//almacenar el total de la compra
let total = 0;
function init() {
  plantsIncluder();
  toggleCarrito();
}

//Insertar dinamicamente cada planta dentro de plantsContainer y a su vez cada planta vaya incluida dentro de su propio container

function plantsIncluder($plantdiv) {
  //selecciono el container
  let $plantsContainer = document.querySelector("#plantsContainer");
  

  //FALTA por anadir los data-atributes para poder anadirlos con el boton de anadir al carrito
  for (plant of plants) {
    let $plantdiv = document.createElement("div");
    $plantdiv.classList.add("planta");
    $plantdiv.dataset.nombre = plant.nombre;
    $plantdiv.dataset.precio = plant.precio;
    $plantdiv.dataset.stock = plant.stock;
    $plantdiv.dataset.cantidad = plant.cantidad;
    $plantdiv.dataset.id = plant.id;

    let $img = document.createElement("img");
    $img.src = plant.img;

    let $nombre = document.createElement("h3");
    $nombre.textContent = plant.nombre;

    let $descripcion = document.createElement("p");
    $descripcion.textContent = plant.descripcion;

    let $precio = document.createElement("p");
    $precio.textContent = `Precio: ${plant.precio} euros`;

    let $addButton = document.createElement("button");
    $addButton.textContent = "Añadir a la cesta";
    $addButton.classList.add("addbutton");

    $addButton.onclick = () => {
      addToCart($plantdiv);
      sumaTotal(carrito);
    };
   
    $plantsContainer.appendChild($plantdiv);
    $plantdiv.appendChild($img);
    $plantdiv.appendChild($nombre);
    $plantdiv.appendChild($descripcion);
    $plantdiv.appendChild($precio);
    $plantdiv.appendChild($addButton);
  }
}

//Mostrar u ocultar carrito
function toggleCarrito() {
  let $toggle = document.querySelector("#carrito");
  if (!$toggle.classList.contains("hidden")) {
    $toggle.classList.add("hidden");
  } else {
    if ($toggle.classList.contains("hidden")) {
      $toggle.classList.remove("hidden");
    }
  }
}

let carrito = [];

function addToCart($plantdiv) {
  
  carrito.push($plantdiv.dataset);
  
  crearDivCarrito(
    $plantdiv.dataset.nombre,
    $plantdiv.dataset.precio,
    $plantdiv.dataset.cantidad,
    $plantdiv.dataset.stock,
    $plantdiv.dataset.id
  );
}

function crearDivCarrito(nombre, precio, cantidad, stock, id) {
  //TODO: cambiar el push de lugar y solucionar todos los problemas que surjan.
  //carrito.push({id,nombre,cantidad,precio,stock})//
  let $plantCheckOut = document.querySelector("#checkOutContainer");
  let $checkOutPlant = document.createElement("div");
  $checkOutPlant.classList.add("checkOutPlant");
  $checkOutPlant.id = "plant-" + id;
  $checkOutPlant.dataset.stock = stock;
  $checkOutPlant.dataset.id = id;

  let $nombre = document.createElement("h3");
  $nombre.textContent = nombre;

  let $cantidad = document.createElement("p");
  $cantidad.textContent = `Cantidad: ${cantidad} `;

  let $precio = document.createElement("p");
  $precio.textContent = `Precio: ${precio} euros`;

  let $botonSumar = document.createElement("button");
  $botonSumar.textContent = "+";
  //$botonSumar.onclick = () => addCantidad($checkOutPlant.dataset.id)
  $botonSumar.onclick = () => {
    cantidad++;
    $cantidad.textContent = `Cantidad: ${cantidad} `;
    addCantidad(id);
    sumaTotal(carrito);
  };

  let $botonRestar = document.createElement("button");
  $botonRestar.textContent = "-";
  $botonRestar.onclick = () => {
    cantidad--;
    $cantidad.textContent = `Cantidad: ${cantidad} `;
    lessCantidad(id);
    sumaTotal(carrito);
  };

  let $botonEliminar = document.createElement("button");
  $botonEliminar.textContent = "Eliminar";
  $botonEliminar.onclick = () => removeFromCarrito(id);

  //anadir
  $plantCheckOut.appendChild($checkOutPlant);
  $checkOutPlant.appendChild($nombre);
  $checkOutPlant.appendChild($cantidad);
  $checkOutPlant.appendChild($precio);
  $checkOutPlant.appendChild($botonSumar);
  $checkOutPlant.appendChild($botonRestar);
  $checkOutPlant.appendChild($botonEliminar);
// TODO if div carrito contiene div checkoutplant no ejecutar funcion toggleCarrito
//TODO: if 
  alert(nombre + " ha sido anadido la cesta")
}

// hasta aqui me empuja el el array con los datos.
// en esta funcion queremos encontrar en el array carrito el objeto que tenga la id que le hayamos pasado. Una vez que la hayamos encontrado queremos con la variable cantidad se vea incrementada en uno
//comprobar si la cantidad es menor o igual que stock, si es
function addCantidad(plantId) {
  const foundedPlant = carrito.find((obj) => obj.id === plantId); //crear una funcion con esta frase que me encuentre una planta
  foundedPlant.cantidad++;
  sumaTotal(carrito);
}

function lessCantidad(plantId) {
  const foundedPlant = carrito.find((obj) => obj.id === plantId);

  if (foundedPlant.cantidad <= 1) {
    removeFromCarrito(plantId);
  } else {
    foundedPlant.cantidad--;
    sumaTotal(carrito);
  }
}

function removeFromCarrito(plantId) {
  if (carrito.length > 1) {
    let carritoItemRemove = [];

    for (let i = 0; i < carrito.length; i++) {
      if (carrito[i].id !== plantId) {
        carritoItemRemove.push(carrito[i]);
      }
    }
    carrito = carritoItemRemove;
  } else {
    carrito = [];
  }

  document.querySelector("#plant-" + plantId).remove();

  sumaTotal(carrito);
}

function sumaTotal(arr) {
  const sumatoria = arr.reduce(
    (total, obj) => total + (obj.cantidad * obj.precio || 0),
    0
  );
  total = sumatoria

  $totalCompra = document.querySelector("#compraTotal");
  $totalCompra.textContent = "Total compra " + sumatoria + " Euros";
}
function checkOut() {
    if(total>0){
      alert("Gracias por tu compra")  
    }else{
        if(total<=0)
            alert("El carrito esta vacio")
    }
  
}



init();
