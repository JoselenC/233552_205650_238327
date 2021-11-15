const Sequelize = require("sequelize");

const Sensor = (schema, types) => {
    return schema.define('sensor', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        model: {
            type: types.STRING,
            allowNull: false
        },
        latitude: {
            type: types.STRING,
            allowNull: false
        },
        longitude: {
            type: types.STRING,
            allowNull: false
        },
        name: {
            type: types.STRING,
            allowNull: false
        },
        ESN: {
            type: types.STRING,
            allowNull: false,
            validate: { max: 16 },
            unique: true,
            isAlphanumeric: true, 
        }
    });
};

module.exports = Sensor;
