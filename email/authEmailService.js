import { createTransport } from "../config/nodemailer.js";

export async function sendEmailVerification({name,email,token}){

    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS,
       
    )

    //enviar email
    const info = await transporter.sendMail({
        //from: "Appsalon<appsalon@hotmail.com>",
        from: "Appsalon<cuenta@appsalon.com>",
        to:'correo@correo.com',
        subject: "Appsalon -Verificación de correo electrónico",
        text: "Appsalon -Verificación de correo electrónico",
        html:`<p>hola:${name},confirma tu cuenta en appSalon</p>
             <p>Tu cuenta esta casi lista,solo debes confirmarla con el siguiente enlace</p>
             <a href="${process.env.FRONTEND_URL}/auth/confirmar-cuenta/${token}">Confirmar cuenta</a>
             <p>Si no creaste esta cuenta puedes ignorar este mensaje</p>`
        
    })
    
    console.log("Mensaje enviado", info.messageId);
}

export async function sendEmailPasswordReset({name,email,token}){

    const transporter = createTransport(
        process.env.EMAIL_HOST,
        process.env.EMAIL_PORT,
        process.env.EMAIL_USER,
        process.env.EMAIL_PASS,
       
    )

    //enviar email
    const info = await transporter.sendMail({
        //from: "Appsalon<appsalon@hotmail.com>",
        from: "Appsalon<cuenta@appsalon.com>",
        to:email,
        subject: "Appsalon --Reestablecetu contraseña--",
        text: "Appsalon  --Reestablecetu contraseña--",
        html:`<p>hola:${name},--Has solicitado reestablecer tu contraseña--</p>
             <p>Sigue el siguiente enlace , para generar la nueva contraseña</p>
             <a href="${process.env.FRONTEND_URL}/auth/olvide-password/${token}">Reestablecer Contraseña</a>
             <p>Si no solicitaste una nueva contraseña;puedes ignorar este mensaje</p>`
        
    })
    
    console.log("Mensaje enviado", info.messageId);
}





