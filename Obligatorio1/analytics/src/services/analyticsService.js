const PersonNotifyRepository = require("../repositories/personNotifyRepository");

module.exports= class AnalyticsService{

    constructor() {
    this.personNotifyRepository = new PersonNotifyRepository();    
    }

    async save(data) {
    return await this.personNotifyRepository.save(data);
    }

    async findByEmail(email) {
        return await this.personNotifyRepository.findByEmail(email);
    }   

}