const ConsumerRepository = require("../repositories/consumerRepository");

module.exports= class ExporterService{

    constructor() {
    this.consumerRepository = new ConsumerRepository();    
    }

    async save(data) {
    return await this.consumerRepository.save(data);
    }


    async findByName(name) {
        return await this.consumerRepository.findByName(name);
    }   

}