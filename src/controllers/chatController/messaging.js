const nodemailer = require("nodemailer")
const constants = require("../../configs/constants");


const mailMessaging = (req, res) =>{
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: constants.MAIL,
            pass: constants.PASS
        }
    })
    
    let details = {
        from: req.body.mailFrom,
        to: req.body.mailTo,
        subject: req.body.mailSubject,
        text: req.body.mailMessage
    }
    
    mailTransporter.sendMail(details, (err, info)=>{
        if(err){
            console.log(err)
        }else{
            console.log('Mail successfully sent', info.response)
            res.status(200).json("Mail successfully sent")
        }
    })
}

module.exports = mailMessaging