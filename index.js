import express from 'express'
import dotenv from 'dotenv'
import { conexionDB } from './config/conexionDB.js'
import cors from 'cors'
import servicesRoutes from './routes/servicesRoutes.js'
import authRoutes from './routes/authRoutes.js'
import appointmentRoutes from './routes/appointmentRoutes.js'
import colors from 'colors'
import userRoutes from './routes/userRoutes.js'


//variables de entorno

dotenv.config()


//configurar app
const app = express()

//leer datos via body
app.use(express.json())

//conectar a DB
conexionDB()


//configurar cors

const whiteList=process.argv[2] === '--postman' ? [process.env.FRONTEND_URL,undefined] : [process.env.FRONTEND_URL]


const corsOptions={
    origin:function(origin,callback){
        if(whiteList.includes(origin)){
            //permite la conexion
            return callback(null,true)

        }else{
            //no permite la conexion
            return callback(new Error('Error de CORS'))
            
        }
    }
}
app.use(cors(corsOptions))

//definir ruta
app.use('/api/services',servicesRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/appointments',appointmentRoutes)
app.use('/api/users',userRoutes)


//definir puerto
const PORT = process.env.PORT || 4000

//arrancar la app
app.listen(PORT, () => {
    console.log(colors.yellow(`Servidor iniciado en el puerto ${PORT}`))
})