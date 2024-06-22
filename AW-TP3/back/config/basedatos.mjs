import pg from 'pg'
import dotenv from 'dotenv'
const {Pool} = pg
dotenv.config()
const PORT = process.env.PORT ?? 3000 
const DB_HOST = process.env.DB_HOST
const DB_PASS = process.env.DB_PASS 
const DB_NAME = process.env.DB_NAME  
const DB_USER = process.env.DB_USER  
const pool = new Pool({
    host: DB_HOST,
    port: PORT,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,  
})

export {pool}
