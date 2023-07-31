const tb_userAccess = require("../modules/tb_userAcess");
const bcrypt = require("bcrypt");
const saltRounds = 10;

class UserAccess {
  async passwordGenerate(password) {
    try {
      const hash = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) {
            reject(err);
          } else {
            resolve(hash);
          }
        });
      });
      
      const createPassword = await tb_userAccess
        .create({ password: hash })
        .catch((err) => {
          throw err;
        });
      return createPassword.id;
    } catch (err) {
      console.log(
        "\x1b[36;1m%s\x1b[0m",
        "OCORREU UM ERRO AO GERAR SENHA: " + err
      );
    }
  }

  async checkPassword(password, hashedPassword) {
    try {
      const match = await bcrypt.compare(password, hashedPassword);
      return match;
    } catch (error) {
        console.log("\x1b[36;1m%s\x1b[0m", 'Erro ao verificar a senha: ' + error);
        //throw new Error("\x1b[36;1m%s\x1b[0m", 'Erro ao verificar a senha: ' + error);
      }
  }
}

module.exports = UserAccess;
