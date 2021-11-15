const Sequelize = require("sequelize");

const PropertyObserved = (schema, types) => {
    return schema.define('propertyObserved', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: types.STRING,
            allowNull: false
        },
        unit: {
            type: types.STRING,
            allowNull: false
        },
    });
};

module.exports = PropertyObserved;
