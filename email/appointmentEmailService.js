import { createTransport } from "../config/nodemailer.js";


export async function sendEmailVerification({date,time}){

    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS,
       
    )
    
  //enviar el email
    const info = await transporter.sendMail({
        from: "Appsalon<citas@appsalon.com>",
        to:'admin@appsalon.com',
        subject: "Appsalon -Nueva cita",
        text: "Appsalon -Nueva cita",
        html:`<p>Hola:admin--tienes una nueva cita--</p>
             <p>La cita será el día : ${date}  a las ${time} hs. </p>
     `
        
    })
    
    console.log("Mensaje enviado", info.messageId);

}

export async function sendEmailUpdateAppointment({date,time}){

    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS,
       
    )
    
  //enviar el email
    const info = await transporter.sendMail({
        from: "Appsalon<citas@appsalon.com>",
        to:'admin@appsalon.com',
        subject: "Appsalon -Cita Actualizada-",
        text: "Appsalon -Cita Actualizada-",
        html:`<p>Hola:admin--Un usuario a modificado una cita. --</p>
             <p>La nueva cita será el día : ${date}  a las ${time} hs. </p>
     `
        
    })
    
    console.log("Mensaje enviado", info.messageId);

}
export async function sendEmailCancelAppointment({date,time}){

    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS,
       
    )
    
  //enviar el email
    const info = await transporter.sendMail({
        from: "Appsalon<citas@appsalon.com>",
        to:'admin@appsalon.com',
        subject: "Appsalon -Cita Cancelada-",
        text: "Appsalon -Cita cancelada-",
        html:`<p>Hola : admin--Un usuario a cancelado una cita. --</p>
             <p>La nueva estaba programada para : ${date}  a las ${time} hs. </p>
     `
        
    })
    
    console.log("Mensaje enviado", info.messageId);

}

