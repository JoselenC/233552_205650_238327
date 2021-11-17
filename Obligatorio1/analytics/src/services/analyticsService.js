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

    async calculateDailyAverage(values, startDate, endDate) {
        if (endDate.getYear() - startDate.getYear() == 0 || (endDate.getYear() - startDate.getYear() == 1 && endDate.getMonth() <= startDate.getMonth())) {
            const reducer = (previousValue, currentValue) => previousValue.value + currentValue.value;
            var totalSum = values.reduce(reducer)
            return totalSum / values.length || 0;
        }
        return -1;
    }

    async calculateMonthlyAverage(values, startDate, endDate) {
        if (endDate.getYear() - startDate.getYear() < 10 || (endDate.getYear() - startDate.getYear() == 10 && endDate.getMonth() <= startDate.getMonth())) {
            const reducer = (previousValue, currentValue) => previousValue.value + currentValue.value;
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
        const reducer = (previousValue, currentValue) => previousValue.value + currentValue.value;
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