const Repository = require('../../../catalog/src/repositories/repository');

module.exports = class ObservationRepository {
    constructor() {
        this.observationRepository = Repository.Observation;
    }

    async findAll() {
        let observation = await this.observationRepository.findAll(query);
        return observation;
    }

    async save(data) {
        if (existProperty(data.sensor))
            await this.observationRepository.create(data);
        else
            throw new Error("That reading does not belong to any observable property of said sensor.");
        return observation;
    }

    async findByName(name) {
        try {
            let observation = await this.observationRepository.findOne({ Name: name});
            return observation;
        } catch (err) {
            return null;
        }
    }

    // async getESN() {
    //     try {
    //         let observation = await this.observationRepository.findOne({ Name: name,include: this.relations});
    //         return observation;
    //     } catch (err) {
    //         return null;
    //     }
    // }
}