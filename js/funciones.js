
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
      .catch();


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
      .catch();


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
                    <td>${dato.costo} </td>
                `;
                contenidoDiv.appendChild(newRow); // Añadimos la nueva fila al tbody
            });
        })
        .catch();
}

    



function inicio(argument) {
  
    const button = document.getElementById("buttonInicio");
      button.style.display = 'block';
      const buttonBorrar = document.getElementById("buttonBorrar");
      buttonBorrar.style.display = 'none';
  
  
}
function borrar(argument) {
  
  const button = document.getElementById("buttonInicio");
      button.style.display = 'block';
      const buttonBorrar = document.getElementById("buttonBorrar");
      buttonBorrar.style.display = 'none';
       const tableBody = document.getElementById('tableBody');
      // Eliminar todas las filas
      tableBody.innerHTML = '';
      const cardBody = document.getElementById('cardBody');

    // Agregar mensaje de texto al card-body
    cardBody.textContent = "";
}
function iniciar()
{
   
  const button = document.getElementById("buttonInicio");
      button.style.display = 'none';

      const buttonBorrar = document.getElementById("buttonBorrar");
      buttonBorrar.style.display = 'block';
   nombre_producto= prompt(
      "bienvenido a la calculadora de precios para pastelerìa. Ingrese el nombre del producto que desea realizar"
      );
   if(nombre_producto){
      if(nombre_producto.length>0)
      {
         ingresar_margen_ganancia();
      }
     
   }
}
function ingresar_margen_ganancia(argument) {
   margen_ganancia= prompt("ingrese porcentaje de ganancia esperado");
   if(parseInt(margen_ganancia)>0){
      ingresar_cantidad();
   }else{
      ingresar_margen_ganancia();
   }
}

function ingresar_cantidad(argument) {
  cantidad_ingredientes= prompt("ingrese la cantidad de ingredientes que lleva")
  if(cantidad_ingredientes>0){
      agregar_ingredientes();
   }else{
      ingresar_cantidad();
   }
}

function agregar_ingredientes(argument)
{
  
   for(x=1;x<=cantidad_ingredientes;x++)
   {
      let ingrediente_individual=[];
      let nombre_ingrediente = prompt("ingrese el nombre del ingrediente N° "+x);
      let precio_ingrediente = prompt("ingrese el precio");
      ingrediente_individual.push(nombre_ingrediente);
      ingrediente_individual.push(precio_ingrediente);
      ingredientes.push(ingrediente_individual);
      agregar_ingredientes_tabla(nombre_ingrediente,precio_ingrediente);
   }

   calcularResultados();
  
  
}

function calcularResultados(argument) {
   suma=0;
   precio_final=0;
   for(x=0;x<cantidad_ingredientes;x++){
      suma=suma+ parseFloat(ingredientes[x][1]);
      console.log(suma);
   }

   let porcentaje=(margen_ganancia/100)+1;
   precio_final=suma*porcentaje;
   mensajeFinal();
}
function mensajeFinal(argument) {

 const cardBody = document.getElementById('cardBody');

    // Agregar mensaje de texto al card-body
    cardBody.textContent =  "Para el producto "+ 
      nombre_producto+ 
      "\n\n" +
      "Son necesarios "+
      cantidad_ingredientes+
      " ingredientes " +
      "\n\n" +
       "El costo de producción total es: $" +
      suma +
       "\n\n" +
      "Se espera tener un margen de ganancia de " +
       margen_ganancia +
      "%" +
      "\n\n" +
       "El precio final esperado será de $" +
        precio_final ;

  
}








function agregar_ingredientes_tabla(nombre,precio) {
  // body...
 
      // Obtener el cuerpo de la tabla
      const tableBody = document.getElementById('tableBody');
      // Determinar el número de la nueva fila
      const rowCount = tableBody.rows.length + 1;
      // Crear una nueva fila
      const newRow = document.createElement('tr');
      // Rellenar las celdas de la fila
      newRow.innerHTML = `
        <th scope="row">${rowCount}</th>
        <td>`+nombre+ `</td>
        <td>`+precio+ `</td>
       
      `;
      // Agregar la nueva fila al cuerpo de la tabla
      tableBody.appendChild(newRow);
    
     
    }



