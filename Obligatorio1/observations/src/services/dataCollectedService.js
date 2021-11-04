const DataCollectedRepository = require('../repositories/dataCollectedRepository');
const Publisher = require('../models/publisher');

module.exports = class PropertyObservedService {
    constructor() {
        this.dataCollectedRepository = new DataCollectedRepository();
        this.publisher = new Publisher();
    }
    
    async findAll() {
        return await this.dataCollectedRepository.findAll();
    }

    async save(data) {
        if(this.publisher.publishSaveDataCollected(data))
            return await this.dataCollectedRepository.save(data);
    }
    
    async findByName(name) {
        return await this.dataCollectedRepository.findByName(name);
    }
}