const Repository = require('./repository');
const PersonNotify = require('../models/personNotify')

module.exports = class PersonNotifyRepository {

    constructor() {
        this.repository = new Repository();
    }

    async getAll() {
        var query = await PersonNotify.find();
        let personsNotify = await query;
        return personsNotify.map((personNotify) => personNotify.toObject());
    }

    async save(data) {
        let existing = await PersonNotify.findOne({ Email: data.Email });
        if (existing == null) {
            let personNotify = await PersonNotify.create(data);
            return personNotify.toObject();
        } else {
            throw new Error("That person to notify already exists in the system");
        }
    }

    async findByEmail(email) {
        try {
            return await PersonNotify.findOne({ Email: email });            
        } catch (err) {
            return null;
        }
    }
}