const Repository = require('./repository');

module.exports = class PropertyObservedRepository {
    constructor() {
        this.propertyObservedRepository = Repository.PropertyObserved;
    }

    async findAll() {
        try {
            let property = await this.propertyObservedRepository.findAll();
            return property;
        } catch (err) {
            throw new Error(err.message)
        }
    }

    async save(data) {
        try {
            let property = await this.propertyObservedRepository.create(data);
            return property;
        } catch (err) {
            throw new Error("invalid data")
        }
    }

    async findByName(name,unit) {
        try {            
            let property = await this.propertyObservedRepository.findOne({ Name: name, Unit:unit});
            return property;
        } catch (err) {
            return null;
        }
    }
}