const ConsumerRepository = require("../repositories/consumerRepository");
const ObservationService = require("../../../observations/src/services/observationService")

module.exports = class ExporterService {

    constructor() {
        this.consumerRepository = new ConsumerRepository();
        this.observationService = new ObservationService();
    }

    async getData(){
        return await this.observationService.findAll();
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