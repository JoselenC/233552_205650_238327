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
            return await this.sensorService.sensorProperty(esn, propertyName)
        }
        catch (err) {
            throw new Error("Property does not exist");
        }
    }

    async existProperty(esn, propertyName) {
        try {
            var sensor = await this.sensorService.findByEsn(esn);
            return await this.sensorService.
                existSensorProperty(sensor, propertyName);
        }
        catch (err) {
            throw new Error("Sensor does not exist");
        }
    }

    async save(data) {
        try {
            if (await this.existProperty(data.ESN, data.name)) {
                data.path= "sensor.esn=" + data.ESN + ".property.name="+data.name
                let end = Date.now();  
                data.time = parseFloat((end - data.registrationDate)/1000).toFixed(2);
                console.log(data.time)
                return await this.observationRepository.create(data);
            }
            else
                throw new Error("That reading does not belong to any observable property of said sensor.");
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

}