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

    async calculateDailyAverage(values, startDate, endDate) {
        if (endDate.getYear() - startDate.getYear() == 0 || (endDate.getYear() - startDate.getYear() == 1 && endDate.getMonth() <= startDate.getMonth())) {
            const reducer = (previousValue, currentValue) => previousValue.observation + currentValue.observation;
            var totalSum = values.reduce(reducer)
            return totalSum / values.length || 0;
        }
        return -1;
    }

    async calculateMonthlyAverage(values, startDate, endDate) {
        if (endDate.getYear() - startDate.getYear() < 10 || (endDate.getYear() - startDate.getYear() == 10 && endDate.getMonth() <= startDate.getMonth())) {
            const reducer = (previousValue, currentValue) => previousValue.observation + currentValue.observation;
            var averagePerMonth = [];
            for (var d = startDate.getYear(); d <= endDate.getYear(); d++) {
                let filteredValuesByYear = values.filter(v => v.getYear() == d);
                if (filteredValuesByYear.length != 0) {
                    if (d == endDate.getYear()) {
                        for (var m = 0; d <= endDate.getMonth(); m++) {
                            let filteredValuesByMonth = filteredValuesByYear.filter(v => v.getMonth() == m);
                            if (filteredValuesByMonth.length != 0) {
                                let sumPerMonth = filteredValuesByMonth.reduce(reducer);
                                averagePerMonth.push(sumPerMonth / filteredValuesByMonth.length)
                            }
                        }
                    } else if (d == startDate.getYear()) {
                        for (var m = startDate.getMonth(); d <= 11; m++) {
                            let filteredValuesByMonth = filteredValuesByYear.filter(v => v.getMonth() == m);
                            if (filteredValuesByMonth.length != 0) {
                                let sumPerMonth = filteredValuesByMonth.reduce(reducer);
                                averagePerMonth.push(sumPerMonth / filteredValuesByMonth.length)
                            }
                        }
                    } else {
                        for (var m = 0; d <= 11; m++) {
                            let filteredValuesByMonth = filteredValuesByYear.filter(v => v.getMonth() == m);
                            if (filteredValuesByMonth.length != 0) {
                                let sumPerMonth = filteredValuesByMonth.reduce(reducer);
                                averagePerMonth.push(sumPerMonth / filteredValuesByMonth.length)
                            }
                        }
                    }
                }
            }
            return averagePerMonth.reduce(reducer) / averagePerMonth.length || 0;
        }
        return -1;
    }

    async calculateAnnualAverage(values, startDate, endDate) {
        const reducer = (previousValue, currentValue) => previousValue.observation + currentValue.observation;
        var averagePerYear = [];
        for (var d = startDate.getYear(); d <= endDate.getYear(); d++) {
            let filteredValues = values.filter(v => v.getYear() == d);
            if (filteredValues.length != 0) {
                let sumPerYear = filteredValues.reduce(reducer);
                averagePerYear.push(sumPerYear / filteredValues.length)
            }
        }
        return averagePerYear.reduce(reducer) / averagePerYear.length || 0;
    }

}