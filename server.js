import express from 'express'
import bodyparser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectDB } from './config/db.js'
import userRoute from './routes/user-routes.js'
import productRoute from './routes/product-routes.js'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
//for connection
app.use(cors())
app.use(express.json())
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())
app.use(cookieParser())

app.use('/',userRoute)
app.use('/api/products', productRoute);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

const port = process.env.port || 8080
connectDB()
app.listen(port,()=>{
    console.log(`Server Created on port ${port} `)
})