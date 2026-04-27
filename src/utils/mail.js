import Mailgen from "mailgen"

import nodemailer from "nodemailer"

const sendEmail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Task Manager",
            link: "https://taskmanagerlink.com"

        }
    })

    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent)

    const emailHtml = mailGenerator.generate(options.mailgenContent)


    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS

        }
    })

    const mail = {
        from: "mail.taskmanager@example.com",
        to: options.email,
        subject: options.subject,
        text: emailTextual,
        html: emailHtml
    }
    try {
        await transporter.sendMail(mail)

    }
    catch(error) {
        console.error("Email service failed silently. make sure that you ahve provided your MAILTRAP credentials in the env.file")
        console.error("Error: ",error)
    }
}

const emailVerificationMailgenContent = (username, verificationUrl) => {
    return {
        body : {
            name : username,
            intro : "Welcome to our App! we're excited to have you on board ",
            action: {
                instructions: 
                "To Verify your email please click on the following button",
                button: {
                    color: "#1aae5aff",
                    text: "Verify your email",
                    link: verificationUrl


                },
            },
            outro: 
            "Need help, or haev questions? just reply to this email, we'd love tp help",
        },
    };
};

const forgotPasswordMailgenContent = (username, PasswordResetUrl) => {
    return {
        body : {
            name : username,
            intro : "We got a request to reset your Password of your account ",
            action: {
                instructions: 
                "To reset your password click on the following button or link",
                button: {
                    color: "#22BC66",
                    text: "Reset Password",
                    link: PasswordResetUrl,


                },
            },
            outro:
            "Need help or have questions? just reply to this email we'd love to help",

        },
    };
};

export {
    emailVerificationMailgenContent,
    forgotPasswordMailgenContent,
    sendEmail,
};