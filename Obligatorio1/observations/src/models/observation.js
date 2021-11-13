const Sequelize = require("sequelize");

const Observation = (schema, types) => {
    return schema.define('observation', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: Sequelize.STRING,
        unit: Sequelize.STRING,
        value: Sequelize.INTEGER,
        standarizedUnit:  Sequelize.STRING,
        standarizedData:  Sequelize.DECIMAL(10,5),
        time: Sequelize.INTEGER,
        ESN: Sequelize.STRING
    });
};

module.exports = Observation;