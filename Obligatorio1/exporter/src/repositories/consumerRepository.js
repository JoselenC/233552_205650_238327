const Repository = require('./repository');
const Consumer = require('../models/consumer')

module.exports = class ConsumerRepository {

    constructor() {      
        this.repository = new Repository();
    }

    async findAll(limit, offset) {
        var query = await Consumer.find();
        if (limit) {
            query.limit(limit);
        }
        if (offset) {
            query.skip(offset);
        }
        let consumers = await query;
        return consumers.map((consumer) => consumer.toObject());
    }

    async save(data) {
        let existing = await Consumer.findOne({ Name: data.Name });
        if (existing == null) {
            data.URL= "aca iria URL única";
            let consumer = await Consumer.create(data);
            return consumer.toObject();
        } else {
            throw new Error("That consumer already exists");
        }
    }

    async findByName(name) {
        try {
            let consumer = await Consumer.findOne({ Name: name });
            return consumer ? consumer : null;
        } catch (err) {
            return null;
        }
    }
}