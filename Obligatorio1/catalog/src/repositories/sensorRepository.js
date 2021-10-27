const Repository = require('../repositories/repository');

module.exports = class SensorRepository {
    constructor() {
        this.sensorRepository = Repository.Sensor;
        this.relations = ['propertiesObserved'];
    }

    async findAll() {
        var query = { include: this.relations };
        let sensors = await this.sensorRepository.findAll(query);
        return sensors;
    }

    async save(data) {
        let sensor = await this.sensorRepository.create(data, { include: this.relations });
        return sensor;
    }

    async findByName(name) {
        try {
            let sensor = await this.sensorRepository.findOne({ Name: name, include: this.relations });
            return sensor;
        } catch (err) {
            return null;
        }
    }
}