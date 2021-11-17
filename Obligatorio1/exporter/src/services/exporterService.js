const ConsumerRepository = require("../repositories/consumerRepository");
const ObservationService = require("../../../observations/src/services/observationService")

module.exports = class ExporterService {

    constructor() {
        this.consumerRepository = new ConsumerRepository();
        this.observationService = new ObservationService();
    }

    async getData(consumer){
        return await this.observationService.findAllByConsumer(consumer);
    }

    async saveConsumer(data) {
        return await this.consumerRepository.saveConsumer(data);
    }

    async findByEmail(email) {
        return await this.consumerRepository.findByEmail(email);
    }

    async login(data) {
        return await this.consumerRepository.login(data);
    }

}