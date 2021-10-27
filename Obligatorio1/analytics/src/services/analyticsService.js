const PersonNotifyRepository = require("../repositories/personNotifyRepository");

module.exports= class AnalyticsService{

    constructor() {
    this.personNotifyRepository = new PersonNotifyRepository();    
    }

    async save(data) {
    return await this.personNotifyRepository.save(data);
    }

    async findByEmail(email) {
        return await this.personNotifyRepository.findByEmail(email);
    }   

    createTransporter(user, pass, service) {
        var transporter = nodemailer.createTransport({
            service: service,
            auth: {
                user: user,
                pass: pass
            }
        });
        return transporter
    }

    sendMail(emailFrom, pass, service) {
        var transporter = this.createTransporter(eailFrom, pass, service)
        
        this.personNotifyRepository.forEach(person => {
            
            var mailOptions = {
                from: emailFrom,
                to: person.emailTo,
                subject: 'Asunto Del Correo',
                text: mensaje
            };
    
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email enviado: ' + info.response);
                }
            });
        });      
    }

}