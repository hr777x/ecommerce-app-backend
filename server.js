import express from 'express'
import bodyparser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './config/db.js'
import userRoute from './routes/user-routes.js'
import productRoute from './routes/product-routes.js'
import { registerUser } from './controllers/user.js'

const app = express()
//for connection
app.use(cors())
app.use(express.json())
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())
app.use('/',userRoute)
app.use('/api/products', productRoute);
const port = process.env.port || 8080
connectDB()
app.listen(port,()=>{
    console.log(`Server Created on port ${port} `)
})