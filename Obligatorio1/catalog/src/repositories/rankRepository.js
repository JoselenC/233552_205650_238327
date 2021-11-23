const Repository = require('./repository');
const PropertyObservedRepository = require("./propertyObservedRepository")

module.exports = class RankRepository {
    constructor() {
        this.propertyObservedRepository = new PropertyObservedRepository()
        this.rankRepository = Repository.Rank;
        this.relations = ['propertiesObserved'];
    }

    async findAll() {
        try {
            var query = { include: this.relations };
            let rank = await this.rankRepository.findAll(query);
            return rank;
        } catch (err) {
            throw new Error(err.message)
        }
    }

    async save(data) {
        try {
            let rank = await this.rankRepository.create(data, { include: this.relations });
            return rank;
        } catch (err) {
            throw new Error(err.message)
        }
    }

    async findByProperty(property) {
        try {
            console.log("=========")
            console.log(property.dataValues)
            let rank;
            var query = { include: this.relations };
            let ranks = await this.rankRepository.findAll(query);
             ranks.forEach(element => {
               let properties = element.dataValues.propertiesObserved;
               properties.forEach(propertyelement => {
                if (propertyelement.dataValues.name == property.dataValues.name
                    && propertyelement.dataValues.unit == property.dataValues.unit)
                    rank = element
                });
            });
            return rank;
        } catch (err) {
            return null;
        }
    }

    async findByName(name) {
        try {
            let rank = await this.rankRepository.findOne({ Name: name, include: this.relations });
            return rank;
        } catch (err) {
            return null;
        }
    }
}