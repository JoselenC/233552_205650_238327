const Repository = require('./repository');

module.exports = class DataCollectedRepository {
    constructor() {
        this.dataCollectedRepository = Repository.DataCollected;     
        this.relations = ['propertyObserved', 'sensor'];   
    }

    async findAll() {
        var query = { include: this.relations };
        let dataCollected = await this.dataCollectedRepository.findAll(query);
        return dataCollected;
    }

    async save(data) {
        let dataCollected = await this.dataCollectedRepository.create(data, { include: this.relations });
        return dataCollected;
    }

    async findByName(name) {
        try {
            let dataCollected = await this.dataCollectedRepository.findOne({ Name: name,include: this.relations});
            return dataCollected;
        } catch (err) {
            return null;
        }
    }
}