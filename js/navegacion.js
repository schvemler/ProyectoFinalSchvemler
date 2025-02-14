function cargarPagina(argument) {

  let direccion="Pages/"+argument+".html";
  fetch(direccion)
      .then(response => response.text())  // Leemos el archivo como texto
      .then(data => {
        // Inyectamos el contenido en el div con id "contenido"
        document.getElementById('contenido2').innerHTML = data;
      })
      .catch(error => console.error('Error al cargar el archivo HTML:', error));
}

