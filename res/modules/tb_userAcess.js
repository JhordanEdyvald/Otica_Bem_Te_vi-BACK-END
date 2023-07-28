const Sequelize = require("sequelize");
const database = require("../../db");

const userAcess = database.define("tb_userAcess", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  password: {
    type: Sequelize.STRING(255),
    allowNull: false,
  }
});

module.exports = userAcess;
