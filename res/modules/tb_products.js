const Sequelize = require('sequelize');
const database = require('../../db');

const tb_products = database.define('tb_products', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nameProduct: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    category: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    lastPrice: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    installments: {
        type: Sequelize.STRING
    },
    imgProduct: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = tb_products;