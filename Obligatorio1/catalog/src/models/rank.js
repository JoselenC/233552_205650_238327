const Sequelize = require("sequelize");

const Rank = (schema, types) => {
    return schema.define('rank', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        initialValue: { type: Sequelize.DECIMAL(10, 5), allowNull: false },
        finalValue: { type: Sequelize.DECIMAL(10, 5), allowNull: false }
    });
};


module.exports = Rank;
