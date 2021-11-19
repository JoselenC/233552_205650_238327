const { estimatedDocumentCount } = require('../../../exporter/src/models/consumer');
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
        try {
            return await this.sensorRepository.findByEsn(esn);
        } catch (err) {
            throw new Error("Sensor does not exist")
        }
    }

    async existSensorProperty(propertyName) {
        try {
            var sensor = await this.findByEsn(esn);
            var exist = false;
            sensor.propertiesObserved.forEach(element => {
                if (element.name == propertyName) {
                    exist = true;
                }
            });
            return exist;
        } catch (err) {
            throw new Error("Sensor does not exist")
        }
    }

    async sensorProperty(esn, propertyName) {
        try {
            let property = null;
            var sensor = await this.findByEsn(esn);
            sensor.propertiesObserved.forEach(element => {
                if (element.name == propertyName) {
                    property = element;
                }
            });
            return property;
        } catch (err) {
            throw new Error("Sensor does not exist")
        }
    }

    async exist(esn) {
        try {
            return await this.sensorRepository.findByEsn(esn) != null
        } catch (err) {
            throw new Error("Sensor does not exist")
        }
    }
}