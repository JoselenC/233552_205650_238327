const Repository = require('../../../catalog/src/repositories/repository');
const SensorService = require('../../../catalog/src/services/sensorService')

module.exports = class ObservationRepository {
    constructor() {
        this.observationRepository = Repository.Observation;
        this.sensorService = new SensorService();
    }

    async findAll() {
        let observation = await this.observationRepository.findAll(query);
        return observation;
    }


    async existProperty(esn, propertyName) {
        try {
            var sensor = await this.sensorService.findByEsn(esn);
            return await this.sensorService.
                existSensorProperty(sensor, propertyName);
        }
        catch (err) {
            throw new Error("Sensor does not exist");
        }
    }

    async save(data, esn) {
        if (await this.existProperty(esn, data.name)) {
            data.ESN = esn;
            return await this.observationRepository.create(data);
        }
        else
            throw new Error("That reading does not belong to any observable property of said sensor.");
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