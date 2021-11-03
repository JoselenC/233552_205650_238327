const ConsumerRepository = require("../repositories/consumerRepository");
const DataCollectedService = require("../../../observations/src/services/dataCollectedService")

module.exports = class ExporterService {

    constructor() {
        this.consumerRepository = new ConsumerRepository();
        this.dataCollectedService = new DataCollectedService();
    }

    async getData(){
        return await this.dataCollectedService.findAll();
    }

    async saveConsumer(data) {
        return await this.consumerRepository.saveConsumer(data);
    }

    async findByName(name) {
        return await this.consumerRepository.findByName(name);
    }

    async login(data) {
        return await this.consumerRepository.login(data);
    }

}