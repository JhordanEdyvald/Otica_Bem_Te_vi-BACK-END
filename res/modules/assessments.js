const Sequelize = require('sequelize');
const database = require('../../db');

const assessments_tb = database.define('assessments', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    idUser: {
        allowNull: false,
        type: Sequelize.INTEGER,
    },
    idProduct: {
        allowNull: false,
        type: Sequelize.INTEGER,
    },
    assessment: {
        allowNull: false,
        type: Sequelize.INTEGER,
    },
});

module.exports = assessments_tb;
const tb_customers = require("./tb_customers");
tb_customers.belongsTo(assessments_tb, { foreignKey: 'idUser' });