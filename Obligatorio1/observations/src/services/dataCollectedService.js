const ObservationRepository = require('../repositories/observationRepository');
const Publisher = require('../models/publisher');

module.exports = class PropertyObservedService {
    constructor() {
        this.observationRepository = new ObservationRepository();
        this.publisher = new Publisher();
    }
    async findAll() {
        return await this.observationRepository.findAll();
    }

    async save(data) {
        if(this.publisher.publishSaveObservation(data))
            return await this.observationRepository.save(data);
    }
    
    async findByName(name) {
        return await this.observationRepository.findByName(name);
    }
}