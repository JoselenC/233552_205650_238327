const Sensor = require('../models/sensor');
const mongoose = require('mongoose');

module.exports = class EmulatorRepository {
    static initRepository = async () => {
        try {
            this.connect();
        } catch (err){
            console.log(`Error trying to connect to database: ${err}`);
        }
        return Sensor;
    };

    // static getUrl() {
    //     let connectionUrl = Config.get("repositoryEmulator.url");
    //     return connectionUrl;
    // }

    static async connect() {
        this.connection = mongoose.connect("mongodb://localhost:27017/emulator", { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });
    }
}