const ConsumerRepository = require("../repositories/consumerRepository");
const ObservationService = require("../../../observations/src/services/observationService")


module.exports = class ExporterService {

    constructor() {
        this.consumerRepository = new ConsumerRepository();
        this.observationService = new ObservationService();
    }


    async saveConsumer(data) {
        return await this.consumerRepository.saveConsumer(data);
    }

    async findByEmail(email) {
        return await this.consumerRepository.findByEmail(email);
    }

    async findByName(name) {
      return await this.consumerRepository.findByName(name);
  }

    async login(data) {
        return await this.consumerRepository.login(data);
    }

}