const Sequelize = require("sequelize");

const DataCollected = (schema, types) => {
    return schema.define('dataCollected', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: Sequelize.STRING,
        unit: Sequelize.STRING,
        value: Sequelize.INTEGER,
        createdAt: Sequelize.DATE
    });
};

module.exports = DataCollected;