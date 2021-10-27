const Repository = require('./repository');

module.exports = class RankRepository {
    constructor() {
        this.rankRepository = Repository.Rank;        
    }

    async findAll() {
        let dataCollected = await this.rankRepository.findAll(query);
        return dataCollected;
    }

    async save(data) {
        let dataCollected = await this.rankRepository.create(data);
        return dataCollected;
    }
}