const Repository = require('../../../catalog/src/repositories/repository');

module.exports = class ObservationRepository {
    constructor() {
        this.observationRepository = Repository.Observation;
    }

    async findAll() {
        let observation = await this.observationRepository.findAll(query);
        return observation;
    }

    async save(data, esn) {
        if (existProperty(esn,data.name))
            await this.observationRepository.create(data);
        else
            throw new Error("That reading does not belong to any observable property of said sensor.");
        return observation;
    }

    async existProperty(esn, propertyName) {
        var sensor= await this.sensorService.findByEsn(esn);
        return await this.sensorService.existSensorProperty(sensor, propertyName)
    }

    async findByName(name) {
        try {
            let observation = await this.observationRepository.findOne({ Name: name });
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