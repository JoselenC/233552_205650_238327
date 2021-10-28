const Config = require('config');
const Sequelize = require('sequelize');
const mysql = require('mysql2/promise');
const SensorModel = require('../models/sensor');
const PropertyObservedModel = require('../models/propertyObserved');
const RankModel = require('../models/rank');
const DataCollectedModel = require('../models/dataCollected');


module.exports = class Repository {
    constructor() {
        this.connection = null;
    }

    static async connect() {
        const databaseConfig = Config.get("repomysql");
        this.connection = new Sequelize(databaseConfig.database, databaseConfig.user,
            databaseConfig.password, databaseConfig.options);
        const connection = await mysql.createConnection({ host:databaseConfig.host, port:databaseConfig.port
            , user:databaseConfig.user, password:databaseConfig.password });
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${databaseConfig.database}\`;`);
        this.connection = new Sequelize(databaseConfig.database, databaseConfig.user,
            databaseConfig.password, databaseConfig.options);
    }


    static async loadModels() {
        const PropertyObserved = PropertyObservedModel(this.connection, Sequelize);
        module.exports.PropertyObserved = PropertyObserved
        const Sensor = SensorModel(this.connection, Sequelize);
        module.exports.Sensor = Sensor
        const Rank = RankModel(this.connection, Sequelize);
        module.exports.Rank = Rank
        const DataCollected = DataCollectedModel(this.connection, Sequelize);
        module.exports.DataCollected = DataCollected

        Sensor.belongsTo(Sensor);
        Sensor.hasMany(PropertyObserved, { as: 'propertiesObserved' });
        DataCollected.belongsTo(DataCollected);
        DataCollected.hasOne(PropertyObserved, { as: 'propertiesObserved' });
        DataCollected.hasOne(Sensor, { as: 'sensor' });

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