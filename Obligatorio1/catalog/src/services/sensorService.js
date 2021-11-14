const SensorRepository = require('../repositories/sensorRepository');

module.exports = class SensorService {
    constructor() {
        this.sensorRepository = new SensorRepository();
    }
    async findAll() {
        return await this.sensorRepository.findAll();
    }
    async save(data) {
        return await this.sensorRepository.save(data);
    }
    async findByEsn(esn) {
        return await this.sensorRepository.findByEsn(esn);
    }

    async existSensorProperty(sensor, propertyName) {
        var exist = false;
        sensor.propertiesObserved.forEach(element => {
            if (element.name == propertyName) {
                exist = true;
            }
        });
        return exist;
    }

    async sensorProperty(esn, propertyName) {
        let property= null;
        var sensor = await this.findByEsn(esn);
        sensor.propertiesObserved.forEach(element => {
            if (element.name == propertyName) {
                property= element;              
            }
        });
        return property;
    }

    async exist(sensor) {
        return await this.sensorRepository.findByEsn(sensor.esn) != null
    }
}