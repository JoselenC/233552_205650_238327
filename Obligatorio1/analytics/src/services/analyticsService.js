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
            this.sendMail(data.name);
            return false;
        }
        else {
            return true;
        }

    }

    async calculateDailyAverage(observations, data) {
        let startDate =  new Date(data.startDate).getTime();
        let endDate =  new Date(data.endDate).getTime();
        let startYear = new Date(startDate).getFullYear();
        let finalYear = new Date(endDate).getFullYear();
        let avergaeDay = [];
        let countDays = 0;    
        if (finalYear - startYear > 1 || finalYear < startYear)
            throw new Error("Incorrect rank")
        for (let i = startDate; i < endDate; i = i + 60 * 60 * 24 * 1000) {
            let count = 0;
            let average = 0;
            while (countDays < observations.length && 
                new Date(observations[countDays].registrationDate).getTime() >= i
                && new Date(observations[countDays].registrationDate).getTime() < i+ 60 * 60 * 24 * 1000) {
                average += observations[countDays].standarizedData;
                count++;
                countDays++
            }
            let date = new Date(i);
            avergaeDay.push({ key: date, value: count == 0 ? 0 : average })
        }

        return avergaeDay;
    }

    async calculateMonthlyAverage(observations, data) {
        let startDate =  new Date(data.startDate).getTime();
        let endDate =  new Date(data.endDate).getTime();
        let startYear = new Date(startDate).getFullYear();
        let finalYear = new Date(endDate).getFullYear();
        let avergaeMonth = [];
        let countMonths = 0;    
        if (finalYear < startYear)
            throw new Error("Incorrect rank")
        for (let i = startDate; i < endDate; i = i + 60 * 60 * 24 * 1000*getCoutDays(startDate)) {
            let count = 0;
            let average = 0;
            while (countMonths < observations.length && 
                new Date(observations[countMonths].registrationDate).getTime() >= i
                && new Date(observations[countMonths].registrationDate).getTime() < 
                i+ 60 * 60 * 24 * 1000* getCoutDays(startDate)) {
                average += observations[countMonths].standarizedData;
                count++;
                countMonths++
            }
            let date = new Date(i);
            avergaeMonth.push({ key: date, value: count == 0 ? 0 : average })
        }
        return avergaeMonth;
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
        if (finalYear < startYear)
            throw new Error("Incorrect rank")
        observations.forEach(element => {
            avergaeYear.push({ day: count, average: 0 })
            startYear = startYear + 1
            countYears = countYears + 1;

            if (new Date(element.registrationDate).getFullYear() == startYear) {
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

function getCoutDays(date) {
    return new Date(new Date(date).getFullYear(),new Date(date).getMonth() + 1, 0).getDate();
}