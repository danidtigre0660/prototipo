import {parse,formatISO,startOfDay,endOfDay,isValid} from 'date-fns'
import Appointment from '../models/Appointment.js'
import {validateObjectId,handleNotFoundError,formatDate} from '../utils/index.js'
import {sendEmailVerification,sendEmailUpdateAppointment,sendEmailCancelAppointment} from '../email/appointmentEmailService.js'




const createAppointment = async(req,res)=>{

    const appointment = req.body
    appointment.user = req.user._id.toString()
    try{
        const newAppointment = new Appointment(appointment)
    const result  =  await newAppointment.save()
        await sendEmailVerification({
            date:formatDate(result.date),
            time:result.time
        })
        
        
        res.json({
            msg:'Tu reservación se realizó correctamente'
        })


        } catch (error) {
        console.error(error);
        }
}

const getAppointementsByDate = async (req,res) =>{
   const {date} = req.query
   

   const newDate = parse(date, 'dd/MM/yyyy', new Date())

   if(!isValid(newDate)){
    const error = new Error ('fecha no válida')
    return res.status(400).json({msg:error.message})
   }



   const isoDate = formatISO(newDate)



   const appointments = await Appointment.find({
    date:{
        $gte:startOfDay(new Date(isoDate)),
        $lte:endOfDay(new Date(isoDate))}
        }).select('time')

        res.json(appointments)
}

const getAppointmentById = async (req,res) =>{
    const {id} = req.params

    //validar por object id
    if(validateObjectId(id,res)) return

    //validar q exista
    const appointment = await Appointment.findById(id).populate('services')

    if(!appointment){
        return handleNotFoundError('La Cita no existe',res)
    } 
    //console.log()
    //console.log(req.user._id)

    if(appointment.user.toString()!== req.user._id.toString()){
        const error = new Error('No tienes los permisos')
        return res.status(403).json({msg:error.message})
    }

    //retornar la cita
    res.json(appointment)
}

const updateAppointment = async(req,res) =>{
    const {id} = req.params

    //validar por object id
    if(validateObjectId(id,res)) return

    //validar q exista
    const appointment = await Appointment.findById(id).populate('services')

    if(!appointment){
        return handleNotFoundError('La Cita no existe',res)
    } 
    //console.log()
    //console.log(req.user._id)

    if(appointment.user.toString()!== req.user._id.toString()){
        const error = new Error('No tienes los permisos')
        return res.status(403).json({msg:error.message})
    }
    const {date,time,totalAmount,services} = req.body
    appointment.date = date
    appointment.time = time
    appointment.totalAmount = totalAmount
    appointment.services = services

    try {
        const result = await appointment.save()
        await sendEmailUpdateAppointment({
            date:result.date,
            time:result.time
        })
        res.json({
            msg:'Cita actualizada correctamente'
        })

        
    } catch (error) {
        console.log(error)

        
    }

}

const deleteAppointment = async(req,res) =>{
    const {id} = req.params

    //validar por object id
    if(validateObjectId(id,res)) return

    //validar q exista
    const appointment = await Appointment.findById(id).populate('services')

    if(!appointment){
        return handleNotFoundError('La Cita no existe',res)
    } 

    if(appointment.user.toString()!== req.user._id.toString()){
        const error = new Error('No tienes los permisos')
        return res.status(403).json({msg:error.message})
    }
    try {
      const result = await appointment.deleteOne()
        await sendEmailCancelAppointment({
            date:result.date,
            time:result.time
        })
        res.json({
            msg:'Cita cancelada correctamente'

        })

        
    } catch (error) {
        console.log(error)
        
    }

}


export{
    createAppointment,
    getAppointementsByDate,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
}