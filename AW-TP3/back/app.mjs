import express from 'express'
import { obtenerproductos, obtenerproductosid, agregarProducto, eliminarProducto, modificarProducto} from './funcionalidades.mjs'
import cors from 'cors'

const PUERTO = 3000
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.route('/productos')
    .get(async(req,res)=>{
        obtenerproductos(res)
    })
    .post((req,res)=>{
        agregarProducto(req, res)
    })

app.delete('/productos/:id', (req,res)=>{
    eliminarProducto(req,res)
})

app.get('/productos/:id', (req, res)=>{
    const producto = req.params.id;
    obtenerproductosid(res, producto)
})
app.put('/productos/:id', (req,res)=>{
    modificarProducto(req,res)
})
app.listen(PUERTO)