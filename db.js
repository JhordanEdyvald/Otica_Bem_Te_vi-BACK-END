const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_USERNAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    logging: false
});

module.exports = sequelize;