const Repository = require('../repositories/repository');
const Observation = require('../models/observation')

module.exports = class ObservationRepository {
    constructor() {
        this.repository = new Repository();
    }

    async findAll() {
        try {
            let observation = await Observation.find();
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
            return await Observation.create(data);
        }
        catch (err) {
            throw new Error(err.message);
        }
    }


    async findByName(name) {
        try {
            let observation = await Observation.findOne({ Name: name });
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
            let esn = ctx.request.body.sensor.ESN;
            let observations = await Observation.find()
            let filteredObservations = [];
            observations.forEach(element => {
                if (new Date(element.registrationDate).getTime() >= new Date(startDate).getTime()
                    && new Date(element.registrationDate).getTime() <= new Date(endDate).getTime()) {
                    if (element.name == propertyObserved.name &&
                        element.standarizedUnit == propertyObserved.unit &&
                        element.ESN == esn) {
                        filteredObservations.push(element);
                    }
                }
            });                  
            return filteredObservations
        }
        catch (err) {
            return null;
        }
    }

}