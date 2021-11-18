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
                        throw new Error(error.message);
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

    async calculateDailyAverage(observations, data) {
        let startDate = data.startDate;
        let endDate = data.endDate;
        let startDay = new Date(startDate).getUTCDate();
        let finalDay = new Date(endDate).getUTCDate();
        let count = 0;
        let countDays = 0;
        let avergaeDay = [];
        let average = 0;
        let first = false;
        if (finalDay < startDay)
            throw new Error("Incorrect rank")
        observations.forEach(element => {
            if (!first && new Date(element.registrationDate).getUTCDate() > startDay) {
                avergaeDay.push({ day: countDays, average: 0 })
                startDay = startDay + 1
                countDays = countDays + 1;
            }
            if (startDay <= finalDay) {
                first = true;
                if (new Date(element.registrationDate).getUTCDate() == startDay) {
                    average += parseFloat(element.standarizedData);
                    count = count + 1;
                }
                else {
                    avergaeDay.push({ day: countDays, average: average / count })
                    startDay = startDay + 1;
                    countDays = countDays + 1;
                    count = 0;
                    average = 0;
                }
            }
        });
        if (countDays == (finalDay - startDay) + 1)
            avergaeDay.push({ day: countDays, average: average / count })
        else if (finalDay == startDay)
            avergaeDay.push({ day: 1, average: average / count })
        return avergaeDay;
    }

    async calculateMonthlyAverage(observations, data) {
        let startDate = data.startDate;
        let endDate = data.endDate;
        let startMonth = new Date(startDate).getMonth();
        let finalMonth = new Date(endDate).getMonth();
        let count = 0;
        let countMonth = 1;
        let averageMonth = [];
        let average = 0;
        let first = false;
        if (finalMonth < startMonth)
            throw new Error("Incorrect rank")
        observations.forEach(element => {
            if (!first && new Date(element.registrationDate).getMonth() > startMonth) {
                avergaeDay.push({ Month: countMonth, average: 0 })
                startMonth = startMonth + 1
                countMonth = countMonth + 1;
            }
            if (startMonth <= finalMonth) {
                first = true;
                if (new Date(element.registrationDate).getMonth() == startMonth) {
                    average += parseFloat(element.standarizedData);
                    count = count + 1;
                }
                else {
                    averageMonth.push({ Month: countMonth, average: average / count })
                    startMonth = startMonth + 1;
                    countMonth = countMonth + 1;
                    count = 0;
                    average = 0;
                }
            }
        });
        if (countMonth == (finalMonth - startMonth))
            averageMonth.push({ Month: countMonth, average: average / count })
        else if (finalMonth == startMonth)
            averageMonth.push({ Month: 1, average: average / count })
        return averageMonth;
    }

    async calculateAnnualAverage(observations, data) {
        let startDate = data.startDate;
        let endDate = data.endDate;
        let startYear = new Date(startDate).getFullYear();
        let finalYear = new Date(endDate).getFullYear();
        let count = 0;
        let countYears = 1;
        let avergaeYear = [];
        let average = 0;
        let first = false;
        if (finalYear < startYear)
            throw new Error("Incorrect rank")
        observations.forEach(element => {
            if (!first && new Date(element.registrationDate).getFullYear() > startYear) {
                avergaeYear.push({ year: countYears, average: 0 })
                startYear = startYear + 1
                countYears = countYears + 1;
            }
            if (startYear <= finalYear) {
                first = true;
                if (new Date(element.registrationDate).getFullYear() == startYear) {
                    average += parseFloat(element.standarizedData);
                    count = count + 1;
                }
                else {
                    avergaeYear.push({ year: countYears, average: average / count })
                    startYear = startYear + 1;
                    countYears = countYears + 1;
                    count = 0;
                    average = 0;
                }
            }
        });
        if (countYears == (finalYear - startYear))
            avergaeYear.push({ year: countYears, average: average / count })
        else if (finalYear == startYear)
            avergaeYear.push({ year: 1, average: average / count })
        return avergaeYear;
    }


}