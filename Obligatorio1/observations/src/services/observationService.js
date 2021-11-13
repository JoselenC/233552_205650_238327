const ObservationRepository = require('../repositories/observationRepository');

module.exports = class ObservationService {
    constructor() {
        this.observationRepository = new ObservationRepository();       
    }

    async findAll() {
        return await this.observationRepository.findAll();
    }

    async save(data) {   
        return await this.observationRepository.save(data);
    }

    async sensorProperty(esn, propertyName) {   
        return await this.observationRepository.sensorProperty(esn, propertyName);
    }

    async findByName(name) {
        return await this.observationRepository.findByName(name);
    }
}