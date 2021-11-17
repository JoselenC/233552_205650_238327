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

    async findObservedPropertiesByDateAndSensor(startDate, endDate, observedPropertyName, observedPropertyUnit, sensor){
        try {
            let dataCollected = await this.observationRepository.findAll({where: {
                [Op.and]: [{name:observedPropertyName, unit:observedPropertyUnit, ESN: sensor},
                {createdAt: {
                    [Op.between]: [startDate, endDate]
                }}]
            }})
            return dataCollected;
        }
        catch (err){
            return null;
        }
    }

}