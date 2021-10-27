const Sequelize = require("sequelize");

const Sensor = (schema, types) => {
    return schema.define('sensor', {
        model: Sequelize.STRING,
        latitude: Sequelize.STRING,
        longitude: Sequelize.STRING,
        name: Sequelize.STRING,
        ESN: { type: types.STRING, allowNull: false, validate: { max: 16 } } 
    });
};

module.exports = Sensor;
