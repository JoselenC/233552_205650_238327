const Sequelize = require("sequelize");

const Sensor = (schema, types) => {
    return schema.define('sensor', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        model: {
            type: Sequelize.STRING,
            allowNull: false
        },
        latitude: {
            type: Sequelize.STRING,
            allowNull: false
        },
        longitude: {
            type: Sequelize.STRING,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        ESN: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: { max: 16 },
            unique: true,
            isAlphanumeric: true, 
        }
    });
};

module.exports = Sensor;
