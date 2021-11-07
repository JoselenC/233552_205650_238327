const ObservationRepository = require('../repositories/observationRepository');
const Publisher = require('../models/publisher');

module.exports = class ObservationService {
    constructor() {
        this.observationRepository = new ObservationRepository();
        this.publisher = new Publisher();
    }

    async findAll() {
        return await this.observationRepository.findAll();
    }

    async save(data,esn) {
        this.publisher.publishSaveObservation(data)
        return await this.observationRepository.save(data,esn);
    }

    async findByName(name) {
        return await this.observationRepository.findByName(name);
    }
}