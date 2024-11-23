import dotenv from 'dotenv'
import { conexionDB } from '../config/conexionDB.js'
import colors from 'colors'
import Services from '../models/ServicesModels.js'
import {services} from '../data/beautyServices.js'

dotenv.config()
await conexionDB()

 async function seedDB(){
    try {
        await Services.insertMany(services)
        console.log(colors.green('Los servicios se  insertados con exito'))
        process.exit()
        
    } catch (error) {
        console.error(error)
        process.exit(1)
        
    }
    
}

async function clearDB(){

    try {
        await Services.deleteMany()
        console.log(colors.red('Se eliminaron los datos'))
        process.exit()
        
    } catch (error) {
        console.error(error)
        process.exit(1)
        
    }
    
}

if(process.argv[2]==='--import'){
    seedDB()
}else{
    clearDB()

}