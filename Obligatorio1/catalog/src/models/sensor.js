const Sequelize = require("sequelize");

const Sensor = (schema, types) => {
    return schema.define('sensor', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        model: Sequelize.STRING,
        latitude: Sequelize.STRING,
        longitude: Sequelize.STRING,
        name: Sequelize.STRING,
        ESN: { type: types.STRING, allowNull: false, validate: { max: 16 } }
    });
};

module.exports = Sensor;
