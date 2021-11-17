const ObservationRepository = require('../repositories/observationRepository');

module.exports = class ObservationService {
    constructor() {
        this.observationRepository = new ObservationRepository();
    }

    async findAllByConsumer(consumer) {
        let observations = [];
        let allObservations = await this.observationRepository.findAll();
        allObservations.forEach(element => {
            if (element.registrationDate > consumer.ObserveFrom)
                observations.push(element)
        });
        return observations;
    }

    async findAll(consumer) {
        return await this.observationRepository.findAll();
    }

    async save(data) {
        try {
            return await this.observationRepository.save(data);
        } catch (err) {
            throw new Error(err.message)
        }
    }

    async sensorProperty(esn, propertyName) {
        try {
            return await this.observationRepository.sensorProperty(esn, propertyName);
        } catch (err) {
            throw new Error("Property does not exist");
        }

    }

    async findByName(name) {
        return await this.observationRepository.findByName(name);
    }

    async findObservedPropertiesByDateAndSensor(startDate, endDate, observedPropertyName, observedPropertyUnit , sensor){
        return await this.observationRepository.findObservedPropertiesByDateAndSensor(startDate, endDate, observedPropertyName, observedPropertyUnit, sensor); 
    }
}