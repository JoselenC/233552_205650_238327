const Config = require('config');
const Sequelize = require('sequelize');
const mysql = require('mysql2/promise');
const ObservationModel = require('../models/observation');


module.exports = class Repository {
    constructor() {
        this.connection = null;
    }

    static async connect() {
        const databaseConfig = Config.get("repoObservation");
        this.connection = new Sequelize(databaseConfig.database, databaseConfig.user,
            databaseConfig.password, databaseConfig.options);
        const connection = await mysql.createConnection({ host:databaseConfig.host, port:databaseConfig.port
            , user:databaseConfig.user, password:databaseConfig.password });
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${databaseConfig.database}\`;`);
        this.connection = new Sequelize(databaseConfig.database, databaseConfig.user,
            databaseConfig.password, databaseConfig.options);
    }


    static async loadModels() {      
        const Observation = ObservationModel(this.connection, Sequelize);
        module.exports.Observation = Observation
        return this.connection.sync();
    }

    static async initRepository() {
        try {
            await this.connect();
            await this.loadModels();
        } catch (err) {
            console.log(`Error trying to connect to database: ${err}`);
            throw err;
        }
    }
}