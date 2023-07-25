const tb_customers = require("../modules/tb_customers");

class Customers {
  async createCustomer(object) {
    try {
      let phone;
      const user = await tb_customers.findOne({
        where: { nameCustomer: object.nameCustomer },
        attributes: ["nameCustomer"],
      });
      const email = await tb_customers.findOne({
        where: { email: object.email },
        attributes: ["email"],
      });
      if (object.phoneNumber) {
        phone = await tb_customers.findOne({
          where: { phoneNumber: object.phoneNumber },
          attributes: ["phoneNumber"],
        });
      }
      if (user != null && object.nameCustomer == user.nameCustomer) {
        throw 0;
      } else if (email != null && object.email == email.email) {
        throw 1;
      } else if (phone != null && object.phoneNumber == phone.phoneNumber) {
        throw 2;
      }
    } catch (codeErr) {
      switch (codeErr) {
        case 0:
          console.error("Já existe um usuário com este nome");
          return { status: false, err: "Já existe um usuário com este nome" };
          break;
        case 1:
          console.error("Já existe um usuário com este email");
          return { status: false, err: "Já existe um usuário com este email" };
          break;
        case 2:
          console.error("Já existe um usuário com este número de celular");
          return {
            status: false,
            err: "Já existe um usuário com este número de celular",
          };
          break;
      }
    }
    try {
      const createCustomer = await tb_customers.create(object);
      console.log("Tudo certo, usuário criado!");
      return { status: true };
    } catch (error) {
        console.log(error)
      let all_errors;
      if (error.errors && error.errors.item) {
        all_errors = error.errors
          .map((item) => {
            return item.message;
          })
          .join(" |\n   ");
      } else if (error.parent) {
        all_errors = error.parent.sqlMessage;
      }
      console.error("Erro ao tentar criar um novo usuário: ", all_errors);
      return { status: false, err: all_errors };
    }
  }
}

module.exports = Customers;
