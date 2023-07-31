const tb_permissions = require("../modules/tb_permissions");

class Permissions {
    async addPermission(object) {
        try {
            let infoVerify;
            try {
                infoVerify = await tb_permissions.findOne({
                    where: { userId: object.userId },
                    attributes: ['rule']
                });
            } catch (err) {
            }
        } catch (err) {
            return { status: false, reject: err }
        }
        try {

            if (!object.rule) {
                throw new Error('Defina uma regra de controle para o usuário');
            }

            const allowedRules = ['master', 'client', 'customer'];
            if (!allowedRules.includes(object.rule)) {
                throw new Error('Regra de controle inválida');
            }
            let rules;
            let success;
            switch (object.rule) {
                case 'master':
                    rules = { edit: true, removeClient: true, addClient: true };
                    success = { status: true, success: 'Permissão alterada com sucesso: master' };
                    break;
                case 'client':
                    rules = { edit: true, removeClient: false, addClient: false };
                    success = { status: true, success: 'Permissão alterada com sucesso: editor' };
                    break;
                case 'customer':
                    rules = { edit: false, removeClient: false, addClient: false };
                    success = { status: true, success: 'Permissão alterada com sucesso: consumidor' };
                    break;
            }
            await tb_permissions.create({
                userId: object.idCustomer,
                rules: JSON.stringify(rules)
            });
            return success;

        } catch (err) {
            console.log(err);
            return { status: false, error: err.message };
        }
    }
}

module.exports = Permissions;
