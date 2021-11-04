const Repository = require('../../../catalog/src/repositories/repository');

module.exports = class ObservationRepository {
    constructor() {
        this.observationRepository = Repository.Observation;     
        this.relations = ['sensor'];   
    }

    async findAll() {
        var query = { include: this.relations };
        let observation = await this.observationRepository.findAll(query);
        return observation;
    }

    async save(data) {
        if(existProperty(data.sensor)){
        let observation = await this.observationRepository.create(data, { include: this.relations });
        }
        else{
            //la lectura no pertenece aninguna propiedad observable del sensor indicado
            throw new Error("That reading does not belong to any observable property of said sensor.");
        }
        return observation;
    }

    async findByName(name) {
        try {
            let observation = await this.observationRepository.findOne({ Name: name,include: this.relations});
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