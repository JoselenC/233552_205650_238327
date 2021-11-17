const Repository = require('../../../catalog/src/repositories/repository');
const SensorService = require('../../../catalog/src/services/sensorService')

module.exports = class ObservationRepository {
    constructor() {
        this.observationRepository = Repository.Observation;
        this.sensorService = new SensorService();
    }

    async findAll() {
        try {
            let observation = await this.observationRepository.findAll();
            return observation;
        }
        catch (err) {
            throw new Error(err.message);
        }
    }


    async sensorProperty(esn, propertyName) {
        try {
            let property = await this.sensorService.sensorProperty(esn, propertyName)
            if (property != null)
                return property
            else
                throw new Error("Property does not exist");
        }
        catch (err) {
            throw new Error("Property does not exist");
        }
    }

    async existProperty(esn, propertyName) {
        try {
            var sensor = await this.sensorService.findByEsn(esn);
            var exist = await this.sensorService.
                existSensorProperty(sensor, propertyName);
            return exist
        }
        catch (err) {
            throw new Error("Sensor does not exist");
        }
    }

    async save(data) {
        try {
            if (await this.existProperty(data.ESN, data.name)) {
                let end = Date.now();
                data.time = parseFloat((end - data.registrationDate) / 1000).toFixed(2);
                console.log(data.time)
                return await this.observationRepository.create(data);
            }
            else {
                throw new Error("That reading does not belong to any observable property of said sensor.");
            }
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

    async findPropertiesByDateAndSensor(data){
        try {
            let startDate = data.startDate;
            let endDate = data.endDate;
            let propertyObserved = data.propertyObserved;
            let esn = data.sensor.ESN;
            let observations =  await this.observationRepository.findAll()
            let filteredObservations= [];
            observations.forEach(element => {
                if (new Date(element.registrationDate) >= new Date(startDate)
                && new Date(element.registrationDate) <= new Date(endDate)) {
                    if(element.name==propertyObserved.name && 
                        element.standarizedUnit==propertyObserved.unit &&
                        element.ESN == esn){                       
                            filteredObservations.push(element);
                    }
                }
            });
            return filteredObservations
        }
        catch (err){
            return null;
        }
    }

}