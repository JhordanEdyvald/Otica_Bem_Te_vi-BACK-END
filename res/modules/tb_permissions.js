const database = require('../../db');
const Sequelize = require('sequelize');

const tb_permissions = database.define('tb_permissions', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    rules: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
});

module.exports = tb_permissions;
const tb_customers = require("./tb_customers");
const tb_client = require("./tb_client");
tb_permissions.belongsTo(tb_customers, { foreignKey: 'userId' });
tb_permissions.hasMany(tb_client, { foreignKey: 'ruleId' });