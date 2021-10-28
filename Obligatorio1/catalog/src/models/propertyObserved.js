const Sequelize = require("sequelize");

const PropertyObserved = (schema, types) => {
    return schema.define('propertyObserved', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: Sequelize.STRING,
        unit: Sequelize.STRING
    });
};

module.exports = PropertyObserved;
