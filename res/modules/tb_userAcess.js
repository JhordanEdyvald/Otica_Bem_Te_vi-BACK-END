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
},{
  tableName: "tb_userAcess"
});

module.exports = userAcess;
const tb_clients = require("./tb_client");
userAcess.hasMany(tb_clients, { foreignKey: 'userAccessId' });


