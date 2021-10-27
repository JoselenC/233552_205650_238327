const Sequelize = require("sequelize");

const DataCollected = (schema, types) => {
    return schema.define('dataCollected', {
        name: Sequelize.STRING,
        unit: Sequelize.STRING,
        value: Sequelize.INTEGER
    });
};

module.exports = DataCollected;