const Sequelize = require("sequelize");

const PropertyObserved = (schema, types) => {
    return schema.define('propertyObserved', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        unit: {
            type: Sequelize.STRING,
            allowNull: false
        },

    });
};

module.exports = PropertyObserved;
