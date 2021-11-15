const ObservationRepository = require('../repositories/observationRepository');

module.exports = class ObservationService {
    constructor() {
        this.observationRepository = new ObservationRepository();       
    }

    async findAllByConsumer(consumer) {
        let observations=[];
        let allObservations = await this.observationRepository.findAll();
        allObservations.forEach(element => {
            if(element.registrationDate>consumer.ObserveFrom)
             observations.push(element)
        });
        return observations;
    }

    async findAll(consumer) {
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