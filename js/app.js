// Llamamos al archivo JSON usando fetch para cargar los datos (Leer)
function cargarDatos() {
    fetch('http://localhost:3000/datos')
        .then(response => response.json())
        .then(data => {
            const contenidoDiv = document.getElementById('contenido');
            contenidoDiv.innerHTML = '';  // Limpiar antes de agregar nuevos datos

            data.forEach(dato => {
                contenidoDiv.innerHTML += `
                    <p>ID: ${dato.id} | Nombre: ${dato.nombre}, Edad: ${dato.edad}
                    <button onclick="eliminarDato(${dato.id})">Eliminar</button>
                    <button onclick="mostrarFormularioActualizar(${dato.id}, '${dato.nombre}', ${dato.edad})">Actualizar</button></p>
                `;
            });
        })
        .catch(error => console.error('Error cargando los datos:', error));
}

// Función para guardar nuevos datos (Crear)
function guardarDatos() {
    const nombreInput = document.getElementById("nombre").value;
    const edadInput = document.getElementById("edad").value;

    const nuevoDato = {
        nombre: nombreInput,
        edad: edadInput
    };

    fetch('http://localhost:3000/datos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoDato)
    })
    .then(response => response.json())
    .then(data => {
        cargarDatos(); // Recargar los datos después de guardar
        document.getElementById("nombre").value = '';  // Limpiar los inputs
        document.getElementById("edad").value = '';
    })
    .catch(error => console.error('Error guardando los datos:', error));
}

// Función para eliminar un dato por ID (Eliminar)
function eliminarDato(id) {
    fetch(`http://localhost:3000/datos/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.mensaje);
        cargarDatos(); // Recargar los datos después de eliminar
    })
    .catch(error => console.error('Error eliminando el dato:', error));
}

// Función para mostrar formulario de actualización (Actualizar)
function mostrarFormularioActualizar(id, nombre, edad) {
    document.getElementById("nombre").value = nombre;
    document.getElementById("edad").value = edad;
    document.getElementById("guardarBtn").style.display = 'none';
    const actualizarBtn = document.getElementById("actualizarBtn");
    actualizarBtn.style.display = 'block';
    actualizarBtn.onclick = function() {
        actualizarDatos(id);
    };
}

// Función para actualizar un dato (PUT)
function actualizarDatos(id) {
    const nombreInput = document.getElementById("nombre").value;
    const edadInput = document.getElementById("edad").value;

    const datosActualizados = {
        nombre: nombreInput,
        edad: edadInput
    };

    fetch(`http://localhost:3000/datos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosActualizados)
    })
    .then(response => response.json())
    .then(data => {
        cargarDatos(); // Recargar los datos después de actualizar
        document.getElementById("nombre").value = '';  // Limpiar los inputs
        document.getElementById("edad").value = '';
        document.getElementById("guardarBtn").style.display = 'block';
        document.getElementById("actualizarBtn").style.display = 'none';
    })
    .catch(error => console.error('Error actualizando los datos:', error));
}
