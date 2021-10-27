const Repository = require('./repository');

module.exports = class PropertyObservedRepository {
    constructor() {
        this.propertyObservedRepository = Repository.PropertyObserved;        
    }

    async findAll() {
        let property = await this.propertyObservedRepository.findAll();
        return property;
    }

    async save(data) {
        let property = await this.propertyObservedRepository.create(data);
        return property;
    }

    async findByName(name) {
        try {
            let property = await this.propertyObservedRepository.findOne({ Name: name});
            return property;
        } catch (err) {
            return null;
        }
    }
}