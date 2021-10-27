const RankRepository = require('../repositories/rankRepository');

module.exports = class RankService {
    constructor() {
        this.rankRepository = new RankRepository();
    }
    async findAll() {
        return await this.rankRepository.findAll();
    }
    async save(data) {
        return await this.rankRepository.save(data);
    }
    async findByName(name) {
        return await this.rankRepository.findByName(name);
    }

}