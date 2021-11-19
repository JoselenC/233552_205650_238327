const ConsumerRepository = require("../repositories/consumerRepository");
const ObservationService = require("../../../observations/src/services/observationService")
const axios = require("axios");

module.exports = class ExporterService {

    constructor() {
        this.consumerRepository = new ConsumerRepository();
        this.observationService = new ObservationService();
    }

    async getData(consumer){
        return new Promise(async (resolve, reject) => {
            return axios
              .get(`http://localhost:6067/observations/consumer`, consumer)
              .then((response) => {
                if (response.data.data === undefined || response.data.length === 0) {
                  reject(new Error(""));
                } else {
                  resolve(response.data);
                }
              })
              .catch((error) => {
                reject(new Error(error.message));
              });
          });
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