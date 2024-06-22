const url = new URL(location.href);
const id = url.searchParams.get('id');
const contenido = document.getElementById('contenido')

async function obtenerProducto(id){
    try{
        const traerProducto = await fetch(`http://localhost:3000/productos/${id}`)
        const producto = await traerProducto.json();
        gestionarFormulario(producto[0])
    }catch(err){
        console.error(err);
        throw err;
    }
}

async function gestionarFormulario(producto){
    let html = '';
      const categorias = ['Accesorios', 'Dispositivos de Red', 'Electrodomésticos Inteligentes', 'Componentes de PC'];

        let cargarCategorias = categorias.map(categoria => {
            if (categoria !== producto.categoria) {
                return `<option value="${categoria}">${categoria}</option>`;
            }else{
                return `<option value="${producto.categoria}" disabled selected>${producto.categoria}</option>`;
            }
        }).join('');
    html = `
         <form id="formulario">
            <label for="">Nombre</label>
            <input type="text" name="nombre" value="${producto.nombre}" >
            <br>
            <label for="">Marca</label>
            <input type="text" name="marca" value="${producto.marca}">
            <br>
            <label for="">Categoria</label>
            <select name="categoria" id="">
                ${cargarCategorias}
            </select>
            <label for="">Stock</label>
            <input type="number" name="stock" value="${producto.stock}">
            <br>
            <button type"submit">Modificar</button>
            <br>
  
        </form>
    `

    contenido.innerHTML=html;
    const formulario = document.getElementById('formulario')
    formulario.addEventListener('submit', async(e)=>{
        e.preventDefault();
        let datosForm = new FormData(formulario);
        let datosFormObjeto = Object.fromEntries(datosForm);
        const cuerpo = JSON.stringify(datosFormObjeto)
        enviarModificacion(cuerpo);
    })

}

async function enviarModificacion(cuerpo){
    try{
        const peticion = await fetch(`http://localhost:3000/productos/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type' : 'application/json;charset=utf-8'
                },
                body: cuerpo
            }
        )

    }catch(error){
        alert("No se pudo enviar el formulario")
        console.error(error)
    }
   
    window.location.href='/'
}
obtenerProducto(id)