const PropertyObservedRepository = require('../repositories/propertyObservedRepository');
const Publisher = require('../models/publisher');

module.exports = class PropertyObservedService {
    constructor() {
        this.propertyObservedRepository = new PropertyObservedRepository();
        this.publisher = new Publisher();
    }
    async findAll() {
        return await this.propertyObservedRepository.findAll();
    }

    async save(data) {
        if(this.publisher.publishSaveDataCollected(data))
            return await this.propertyObservedRepository.save(data);
    }
    
    async findByName(name) {
        return await this.propertyObservedRepository.findByName(name);
    }
}