const database = require("../../db");
const Sequelize = require("sequelize");

const tb_clients = database.define("tb_clients", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING(150),
    allowNull: false,
  },
  idCustomer: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  gender: {
    type: Sequelize.STRING(10),
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  phoneNumber: {
    type: Sequelize.STRING(150),
    allowNull: false,
  },
  userAccessId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  ruleId: {
    type: Sequelize.INTEGER,
    allowNull: true,
  }
});


module.exports = tb_clients;
const tb_permissions = require("./tb_permissions");
tb_clients.belongsTo(tb_permissions, { foreignkey: 'ruleId' });
const tb_userAccess = require("./tb_userAcess");
tb_clients.belongsTo(tb_userAccess, { foreignKey: 'userAccessId' });