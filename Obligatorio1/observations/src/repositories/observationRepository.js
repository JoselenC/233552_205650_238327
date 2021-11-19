const Repository = require('../repositories/repository');
const axios = require("axios");
const SensorService = require('../../../catalog/src/services/sensorService')

module.exports = class ObservationRepository {
    constructor() {
        this.observationRepository = Repository.Observation;
        this.sensorService = new SensorService();
    }

    async findAll() {
        try {
            let observation = await Repository.Observation.findAll();
            return observation;
        }
        catch (err) {
            throw new Error(err.message);
        }
    }



    async save(data) {
        try {
            let end = Date.now();
            data.time = parseFloat((end - data.registrationDate) / 1000).toFixed(2);
            return await this.observationRepository.create(data);
        }
        catch (err) {
            throw new Error(err.message);
        }
    }


    async findByName(name) {
        try {
            let observation = await this.observationRepository.findOne({ Name: name });
            return observation;
        } catch (err) {
            return null;
        }
    }

    async findPropertiesByDateAndSensor(ctx) {
        try {
            let startDate = ctx.request.body.startDate;
            let endDate = ctx.request.body.endDate;
            let propertyObserved = ctx.request.body.propertyObserved;
            let esn = ctx.request.body.ESN;
            let observations = await this.observationRepository.findAll()
            let filteredObservations = [];
            observations.forEach(element => {
                if (new Date(element.registrationDate) >= new Date(startDate)
                    && new Date(element.registrationDate) <= new Date(endDate)) {
                    if (element.name == propertyObserved.name &&
                        element.standarizedUnit == propertyObserved.unit &&
                        element.ESN == esn) {
                        filteredObservations.push(element);
                    }
                }
            });
            console.log(observations)
            return filteredObservations
        }
        catch (err) {
            return null;
        }
    }

}