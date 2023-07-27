const Routes = require("./Config");
const express = require("express");
const Customers = require("../controller/customers");
const customers = new Customers;
const Router = express.Router();

const methods_functions = {
    'createCustomer' : async (req, res)=>{
        try {
            const inf = {
                'nameCustomer' : req.body.nameCustomer,
                'dateOfBirth' : req.body.dateOfBirth,
                'phoneNumber' : req.body.phoneNumber,
                'email' : req.body.email,
                'gender': req.body.gender
            };

           const result = await customers.createCustomer(inf);
           if(result.status){
               res.status(200).json({'success': 'Deu certo, usuário cadastrado com sucesso'});
           }else {
            throw 'Ocorreu um erro ao inserir, '+ result.err;
           }
        } catch (err){
            res.status(400).json({'erro': err});
        }
    },
};

//CALLS OF METHODS
Router.post(Routes.products.customers.createCustomer, methods_functions.createCustomer);

module.exports = Router;