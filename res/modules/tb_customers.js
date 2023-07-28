const Sequelize = require('sequelize');
const database = require('../../db');

const tb_customers = database.define('tb_customers',{
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nameCustomer: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    dateOfBirth: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
    },
    shopping: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    phoneNumber:{
        type: Sequelize.TEXT,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    gender : {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    userAccessId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = tb_customers;