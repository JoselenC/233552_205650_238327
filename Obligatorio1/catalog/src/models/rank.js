const Sequelize = require("sequelize");

const Rank = (schema, types) => {
    return schema.define('rank', {
        initialValue: Sequelize.INTEGER,
        finalValue: Sequelize.INTEGER
    });
};

module.exports = Rank;
