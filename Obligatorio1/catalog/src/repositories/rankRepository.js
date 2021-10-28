const Repository = require('./repository');

module.exports = class RankRepository {
    constructor() {
        this.rankRepository = Repository.Rank;        
    }

    async findAll() {
        let rank = await this.rankRepository.findAll(query);
        return rank;
    }

    async save(data) {
        let rank = await this.rankRepository.create(data);
        return rank;
    }

    async save(data) {
        let rank = await this.rankRepository.create(data);
        return rank;
    }

    async findByProperty(property) {
        try {
            let rank = await this.rankRepository.findOne({ Property: property});
            return rank;
        } catch (err) {
            return null;
        }
    }

    async findByName(name) {
        try {
            let rank = await this.rankRepository.findOne({ Name: name});
            return rank;
        } catch (err) {
            return null;
        }
    }
}