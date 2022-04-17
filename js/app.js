const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    listaCursos.addEventListener('click', agregarCurso);
    //Eliminba cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHtml();
    })
}

//Funciones

function agregarCurso(e) {
    e.preventDefault()
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;

        leerDatosCurso(cursoSeleccionado);
    }


}

//Elimina curso del carrito
function eliminarCurso(e){
   if (e.target.classList.contains('borrar-curso')){
       const cursoId = e.target.getAttribute('data-id');
       
       //Elimina del arreglo de articulosCarrito
       articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
       carritoHtml();
   }
}

//Funcion que lee el contenido de html y extrae la informacion del curso

function leerDatosCurso(curso) {


    const infoCurso = {
        iamgen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('p span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1


    }

    //revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if(existe){
        const cursos = articulosCarrito.map(curso =>{
            if(curso.id===infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        });
        articulosCarrito= [...cursos]
    }else{
      //Agrega elementos al arreglo del carrito
    articulosCarrito = [...articulosCarrito, infoCurso]  
    }

    

    console.log(articulosCarrito)
    carritoHtml();

}
//Muestra el carrito de compras en le html

function carritoHtml() {

    // limpiar el html
    limpiarHtml();

    articulosCarrito.forEach(curso => {
        const{imagen, titulo, precio, cantidad,id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
      <td>
           <img src="${curso.iamgen}" width="100">

       </td>

      <td>
              ${titulo}
      
      </td>

      <td>
              ${precio}
      
      </td>

      <td>
              ${cantidad}
      
      </td>
      <td>
             <a href="#" class= "borrar-curso" data-id= "${id}" >x</a>
      
      </td>
      `;
        //   agrega  el HTML del carrito en el tbdy
        contenedorCarrito.appendChild(row);
    })
}


//Elimina el curso de tbody
function limpiarHtml() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}