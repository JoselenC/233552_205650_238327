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
    async findByName(name) {
        return await this.sensorRepository.findByName(name);
    }

    async exist(sensor) {
        return await this.sensorRepository.findByName(sensor.name) != null            
    }
}