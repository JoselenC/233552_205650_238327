const Repository = require('./repository');
const PersonNotify = require('../models/personNotify')

module.exports = class PersonNotifyRepository {

    constructor() {      
        this.repository = new Repository();
    }

    async getAll(limit, offset) {
        var query = await PersonNotify.find();
        if (limit) {
            query.limit(limit);
        }
        if (offset) {
            query.skip(offset);
        }
        let personsNotify = await query;
        return personsNotify.map((personNotify) => personNotify.toObject());
    }

    async save(data) {
        let existing = await PersonNotify.findOne({ Email: data.Email });
        if (existing == null) {
            data.URL= "aca iria URL única"; //TODO
            let personNotify = await PersonNotify.create(data);
            return personNotify.toObject();
        } else {
            throw new Error("That person to notify already exists in the system");
        }
    }

    async findByEmail(email) {
        try {
            let personNotify = await PersonNotify.findOne({ Email: email });
            return personNotify ? personNotify.toObject() : null;
        } catch (err) {
            return null;
        }
    }
}