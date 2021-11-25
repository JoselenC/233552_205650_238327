const PropertyObservedRepository = require('../repositories/propertyObservedRepository');

module.exports = class PropertyObservedService {
    constructor() {
        this.propertyObservedRepository = new PropertyObservedRepository();
    }

    async findAll() {
        return await this.propertyObservedRepository.findAll();
    }

    async save(data) {
        return await this.propertyObservedRepository.save(data);
    }

    async findByName(name,unit) {
        return await this.propertyObservedRepository.findByName(name,unit);
    }

}