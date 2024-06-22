import { pool } from './config/basedatos.mjs'

async function obtenerproductos(res){
    try{
        const resultado = await pool.query('SELECT * FROM productos');
        
        res.json(resultado.rows)

    }catch(error){
        res.status(404).send("Error al mostrar productos")
    }
    
}
async function obtenerproductosid(res, producto){
    try{
        const resultado = await pool.query(`SELECT * FROM productos WHERE id=${producto}`);
        if(resultado.rows.length > 0){
            res.json(resultado.rows)
        }       
        else{
            res.status(404).send('Error, el producto no existe')
        }
    }catch(error){
        res.status(500).send('error al traer producto', error)
    }

}

async function agregarProducto(req, res){
    try{
        const {nombre, marca, categoria, stock} = req.body
        const resultado = await pool.query(`INSERT INTO productos (nombre, marca, categoria, stock) VALUES ($1, $2, $3, $4)`, [nombre, marca, categoria, stock])
        res.status(201).send("Producto creado exitosamente")
    }catch(error){
        console.error(error)
        res.status(500).send("Error del servidor, no se pudo agregar el producto")
    }
}

async function eliminarProducto(req, res){
    try{
        const id = req.params.id;
        console.log(id)
        const buscarproducto = await pool.query(`SELECT * FROM productos WHERE id=${id}`);
        if(!buscarproducto.rows.length > 0){
            res.status(404).send("El producto que se desea eliminar no existe") 
            return;  
        }
        await pool.query(`DELETE FROM productos WHERE id=${id}`)
        res.status(200).send("Producto eliminado exitosamente")
    }catch(error){
        res.status(500).send("Error del servidor, no se pudo eliminar el producto")
    }
}
async function modificarProducto(req,res){
    try{
        const id = req.params.id;
        const {nombre, categoria, stock, marca} = req.body
        await pool.query(`UPDATE Productos SET nombre=$1, categoria=$2, stock=$3, marca=$4 WHERE id=$5`, [nombre, categoria, stock, marca, id])
        res.status(201).send("Producto Modificado.")
    }
    catch(error){
        res.status(500).send('Error en el Servidor.')
    }
}   
export {obtenerproductos, obtenerproductosid, agregarProducto, eliminarProducto, modificarProducto} 