
let cantidad_ingredientes=0;
let margen_ganancia=0;;
let ingredientes=[];
let nombre_producto="";
let precio_final=0;

let suma=0;
function cargarPaginaPrincipal(argument) {

  let direccion="Pages/principal.html";
  fetch(direccion)
      .then(response => response.text())  // Leemos el archivo como texto
      .then(data => {
        
        document.getElementById('contenido_principal').innerHTML = data;
       
      })
      .catch(error => console.error('Error al cargar el archivo HTML:', error));


}

function cargarPaginaListado(argument) {

  let direccion="Pages/"+argument+".html";
  fetch(direccion)
      .then(response => response.text())  // Leemos el archivo como texto
      .then(data => {
        // Inyectamos el contenido en el div con id "contenido"
        document.getElementById('contenido_principal').innerHTML = data;
         cargarDatosMateriaPrima();
      })
      .catch(error => console.error('Error al cargar el archivo HTML:', error));


}
function cargarDatosMateriaPrima() {
    fetch('http://localhost:3000/datos')
        .then(response => response.json())
        .then(data => {
            const contenidoDiv = document.getElementById('tableBody');
            contenidoDiv.innerHTML = '';  // Limpiamos el contenido anterior
            
            data.forEach(dato => {
                // Creamos una nueva fila para cada dato
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <th scope="row">${dato.id}</th>
                    <td>${dato.nombre}</td>
                    <td>${dato.costo} <button onclick="eliminarDatoMateriaPrima(${dato.id})">Eliminar</button></td>
                `;
                contenidoDiv.appendChild(newRow); // Añadimos la nueva fila al tbody
            });
        })
        .catch(error => console.error('Error cargando los datos:', error));
}
function guardarDatosMateriaPrima() {
    const nombreInput = document.getElementById("nombre").value.trim();
    const costoInput = document.getElementById("costo").value.trim();
    console.log(nombreInput)
    console.log(costoInput)

    // Validar entradas
    if (!nombreInput || !costoInput) {


        alert("Por favor, complete todos los campos.");
        return;

    }

    const costoNumero = parseFloat(costoInput);
    if (isNaN(costoNumero) || costoNumero < 0) {
        alert("Por favor, ingrese un costo válido.");
        return;
    }

    const nuevoDato = {
        nombre: nombreInput,
        costo: costoNumero
    };

    // Realiza la solicitud POST
    fetch('http://localhost:3000/datos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoDato)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw new Error(err.error || 'Error en la respuesta del servidor') });
        }
        return response.json();
    })
    .then(data => {
        console.log(data.mensaje); // Mensaje de éxito
        cargarDatosMateriaPrima(); // Recarga los datos
        document.getElementById("nombre").value = '';  
        document.getElementById("costo").value = '';
    })
    .catch(error => console.error('Error guardando los datos:', error));


}


function eliminarDatoMateriaPrima(id) {
    fetch(`http://localhost:3000/datos/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.mensaje);
        cargarDatosMateriaPrima(); // Recargar los datos después de eliminar
    })
    .catch(error => console.error('Error eliminando el dato:', error));
}

