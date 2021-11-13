const PersonNotifyRepository = require("../repositories/personNotifyRepository");
const RankService = require("../../../catalog/src/services/rankService");
const nodemailer = require("nodemailer");


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

    async sendMail(message) {
        let persons = await this.personNotifyRepository.getAll();
        if (persons != null) {
            persons.forEach(person => {
                var mailOptions = {
                    from: "obligatorioarqusoft@gmail.com",
                    to: person.Email,
                    subject: 'Invalid data',
                    text: "Property " + message + " out of range"
                };

                nodemailer.createTransport({
                    service: "gmail",
                    host: 'smtp.gmail.com ',
                    port: 465,
                    secure: true,
                    auth: {
                        user: "obligatorioarqusoft@gmail.com",
                        pass: "ObligatorioArquSoft2021"
                    }
                }).sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email enviado: ' + info.response);
                    }
                });
            });
        }
    }

    async isValidData(data) {
        const rank = await this.rankService.findByProperty(data.name);
        if (data.standarizedData > rank.finalValue || data.standarizedData < rank.initialValue) {
            await this.sendMail(data.name);
            return false;
        }
        else {
            return true;
        }

    }

}