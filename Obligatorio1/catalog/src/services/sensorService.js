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

    async exist(sensor) {
        return await this.sensorRepository.findByEsn(sensor.esn) != null            
    }
}