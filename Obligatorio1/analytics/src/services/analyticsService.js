const PersonNotifyRepository = require("../repositories/personNotifyRepository");
const rankService = require('../../../catalog/src/services/rankService');
const RankService = require("../../../catalog/src/services/rankService");
module.exports = class AnalyticsService {

    constructor() {
        this.personNotifyRepository = new PersonNotifyRepository();
        this.rankService = new RankService()
    }

    async save(data) {
        return await this.personNotifyRepository.save(data);
    }

    async findByEmail(email) {
        return await this.personNotifyRepository.findByEmail(email);
    }

    async createTransporter(user, pass, service) {
        var transporter = nodemailer.createTransport({
            service: service,
            auth: {
                user: user,
                pass: pass
            }
        });
        return transporter
    }

    async sendMail(emailFrom, pass, service) {
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

    async isValidData(data) {
        const rank = this.rankService.findByProperty(data.propertyObserved);
        if (data.value > rank.finalValue || data.value < rank.initialValue) {
            await sendMail();
            return false;
        }
        else {
            return true;
        }

    }

}