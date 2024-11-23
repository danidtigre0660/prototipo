import mongoose from 'mongoose'
import colors from 'colors'

export const conexionDB =async ()=>{

    try {
     const db = await mongoose.connect(process.env.MONGO_URI)
       console.log(colors.blue('MongoDB se conecto correctamente'))
    } catch (error) {
        console.log(`Error : ${error.message}`)
        process.exit(1)
    }

}