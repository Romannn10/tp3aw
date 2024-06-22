const formulario = document.getElementById('productForm')

formulario.addEventListener('submit', async(e)=>{
    e.preventDefault()
    let datosFormulario = new FormData(formulario);
    let datosDelForm = Object.fromEntries(datosFormulario);
    const datosCuerpo = JSON.stringify(datosDelForm)
    try{
        const peticion = await fetch("http://localhost:3000/productos",
        {
            method: formulario.method,
            headers: {
                'Content-Type' : 'application/json;charset=utf-8'
            },
            body: datosCuerpo
        }
    )
    }catch(error){
        alert("no se pudo cargar el formulario")
        console.log(error)
    }
    
})