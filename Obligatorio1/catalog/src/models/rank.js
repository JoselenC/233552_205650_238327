const Sequelize = require("sequelize");

const Rank = (schema, types) => {
    return schema.define('rank', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        initialValue: Sequelize.DECIMAL(10,5),
        finalValue: Sequelize.DECIMAL(10,5)
    });
};

module.exports = Rank;
