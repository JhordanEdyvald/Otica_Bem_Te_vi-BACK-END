const tb_client = require("../modules/tb_client");
const tb_userAccess = require("../modules/tb_userAcess");
const tb_customers = require("../modules/tb_customers");
const UserAccess = require("../controller/userAcess");
const useraccess = new UserAccess;
const Permissions = require("./permissions");
const permissions = new Permissions;

class Client {
  async instertClient(object) {
    try {
      if (object.auth) {
        const passwordAccess = await tb_client
          .findOne({
            where: { email: object.auth.email },
            attributes: ["userAccessId"],
            include: [
              {
                model: tb_userAccess,
                attributes: ["password"],
              },
            ],
          })
          .catch((err) => {
            console.log("\x1b[36;1m%s\x1b[0m", err);
          });

          if(!passwordAccess){
            throw 'Senha ou Email incorretos!';
          }

        const descriptPassword = await useraccess
          .checkPassword(object.auth.password, passwordAccess.tb_userAcess.password)
          .catch((err) => {
            return err;
          });

          
          if(!descriptPassword){
            throw 'Senha ou Email incorretos!';
          }
          
      } else {
        throw "sem autorização para dar poderes no painel master, para o usuário ";
      }
    } catch (err) {
      console.log("\x1b[36;1m%s\x1b[0m", err);
      return { status: "false", erro: err };
    }
    try {
      if (object.idCustomer) {
        const infoCustomer = await tb_customers.findOne({
          where: { id: object.idCustomer },
          attributes: [
            "id",
            "nameCustomer",
            "phoneNumber",
            "email",
            "gender",
            "userAccessId",
          ],
        });
        object.userId = infoCustomer.id;
        object.name = infoCustomer.nameCustomer;
        object.email = infoCustomer.email;
        object.phoneNumber = infoCustomer.phoneNumber;
        object.gender = infoCustomer.gender;
        object.userAccessId = infoCustomer.userAccessId;
      }
    } catch (err) {
      console.log(err);
    }
    try {

      const result = await permissions.addPermission(object);
      const createdClient = await tb_client.create(object).catch((err) => {
        throw err;
      });

      console.log(result);

      return { status: true };
    } catch (error) {
      console.error("\x1b[36;1m%s\x1b[0m", " Erro ao criar conta master: " + error);
      return { status: false, err: error };
    }
  }

}

module.exports = Client;
