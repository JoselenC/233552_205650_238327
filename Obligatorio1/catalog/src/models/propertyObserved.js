const Sequelize = require("sequelize");

const PropertyObserved = (schema, types) => {
    return schema.define('propertyObserved', {
        name: Sequelize.STRING,
        unit: Sequelize.STRING
    });
};

module.exports = PropertyObserved;
