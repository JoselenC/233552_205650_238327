const Repository = require('../../../catalog/src/repositories/repository');

module.exports = class DataCollectedRepository {
    constructor() {
        this.dataCollectedRepository = Repository.DataCollected;     
        this.relations = ['sensor'];   
    }

    async findAll() {
        var query = { include: this.relations };
        let dataCollected = await this.dataCollectedRepository.findAll(query);
        return dataCollected;
    }

    async save(data) {
        if(existProperty(data.sensor)){
        let dataCollected = await this.dataCollectedRepository.create(data, { include: this.relations });
        }
        else{
            //la lectura no pertenece aninguna propiedad observable del sensor indicado
        }
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