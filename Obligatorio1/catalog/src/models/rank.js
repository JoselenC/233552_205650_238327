const Sequelize = require("sequelize");

const Rank = (schema, types) => {
    return schema.define('rank', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        initialValue: Sequelize.INTEGER,
        finalValue: Sequelize.INTEGER
    });
};

module.exports = Rank;
