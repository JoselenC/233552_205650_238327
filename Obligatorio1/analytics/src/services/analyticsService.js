const PersonNotifyRepository = require("../repositories/personNotifyRepository");
const RankService = require("../../../catalog/src/services/rankService");
const nodemailer = require("nodemailer");
const axios = require("axios");

module.exports = class AnalyticsService {

    constructor() {
        this.personNotifyRepository = new PersonNotifyRepository();
        this.rankService = new RankService()
    }

    async save(data) {
        return await this.personNotifyRepository.save(data);
    }

    async delete(email) {
        return await this.personNotifyRepository.delete(email);
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
        var rank;
        await new Promise(async (resolve, reject) => {
            return axios
                .get(`http://localhost:6065/catalog/rank/${data.name}/${data.standarizedUnit}`, data)
                .then((response) => {
                    if (response.data.data === undefined || response.data.length === 0) {
                        reject(new Error(""));
                    } else {
                        resolve(response.data.data)
                        rank = response.data.data
                    }
                })
                .catch((error) => {
                    reject(new Error(error.message));
                });
        });
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
        let count = 1;
        let countDays = 1;
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
            else if (new Date(element.registrationDate).getUTCDate() == startDay) {
                first = true;
                average += parseFloat(element.standarizedData);
                count = count + 1;
            }
            else {
                avergaeDay.push({ day: countDays, average: average / count })
                startDay = startDay + 1;
                countDays = countDays + 1;
                count = 1;
                average = 0;
            }
        });
        while (finalDay >= startDay) {
            avergaeDay.push({ day: countDays, average: average / count })
            startDay = startDay + 1;
            countDays = countDays + 1;
            count = 1;
            average = 0;
        }
        return avergaeDay;
    }

    async calculateMonthlyAverage(observations, data) {
        let startDate = data.startDate;
        let endDate = data.endDate;
        let startMonth = new Date(startDate).getMonth();
        let finalMonth = new Date(endDate).getMonth();
        let count = 1;
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
            else if (new Date(element.registrationDate).getMonth() == startMonth) {
                first = true;
                average += parseFloat(element.standarizedData);
                count = count + 1;
            }
            else {
                averageMonth.push({ Month: countMonth, average: average / count })
                startMonth = startMonth + 1;
                countMonth = countMonth + 1;
                count = 1;
                average = 0;
            }

        });
        while (finalMonth >= startMonth) {
            averageMonth.push({ Month: countMonth, average: average / count })
            startMonth = startMonth + 1;
            countMonth = countMonth + 1;
            count = 1;
            average = 0;
        }
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
            if (new Date(element.registrationDate).getFullYear() == startYear) {
                first = true;

                average += parseFloat(element.standarizedData);
                count = count + 1;
            }
            else {
                avergaeYear.push({ year: countYears, average: average / count })
                startYear = startYear + 1;
                countYears = countYears + 1;
                count = 1;
                average = 0;
            }
        });
        while (finalYear >= startYear) {
            avergaeYear.push({ year: countYears, average: average / count })
            startYear = startYear + 1;
            countYears = countYears + 1;
            count = 1;
            average = 0;
        }
        return avergaeYear;
    }


}