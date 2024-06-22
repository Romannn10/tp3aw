const formulario = document.getElementById('contenido')

const productosJson = async()=>{
    try{
        const datos = await fetch('http://localhost:3000/productos');
        const productos = await datos.json();
        let html = '';
        productos.forEach((producto)=>{
            html+= `
                <article>
                    <h2>${producto.nombre}</h2>
                    <br>
                    <br>
                    <p>${producto.marca}</p>
                    <br>
                    <p>${producto.categoria}</p>
                    <br>
                    <p>${producto.stock}</p>
                    <a href="modificarProducto.html?id=${producto.id}">Administrar</a>
                    <button type="submit" value="${producto.id}" class="b-eliminar">Eliminar</button>
                </article>
            `
        })
        formulario.innerHTML = html;
        const bEliminar = document.querySelectorAll('.b-eliminar')
        bEliminar.forEach((boton)=>{
            
            boton.addEventListener('click', (e)=>{
            e.preventDefault()
            console.log(e.target.value)
           eliminarProducto(e.target.value)
        })
        })
    }catch(error){
        console.error(error)
    }
}

async function eliminarProducto(producto){
    try{
        const productoEliminar = fetch(`http://localhost:3000/productos/${producto}`,
        {
            method:'DELETE'

        })
    }catch(error){
        console.error(error)
        alert("Error al eliminar el producto")
    }
    window.location.href='./'
   
}
productosJson()