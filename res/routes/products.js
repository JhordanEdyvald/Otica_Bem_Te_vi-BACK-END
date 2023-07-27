const Routes = require("./Config");
const express = require("express");
const Products = require("../controller/products");
const product = new Products();
const Router = express.Router();

const methods_functions = {
  'createProduct' : async (req, res) => {
    /* LEMBRAR DE FAZER A FUNÇÃO DE AUTENTICAÇÃO, CASO
          NÃO SEJA O ADMINISTRADOR FAZENDO A REQUISIÇÃO ELE
          RETORNA UM THROW COM UM ERRO. */
    try {
      const info = {
        nameProduct: req.body.nameProduct,
        category: req.body.category,
        price: req.body.price,
        lastPrice: !req.body.lastPrice ? 0 : req.body.lastPrice,
        installments: req.body.installments,
        imgProduct: req.body.imgProduct,
      };
      const result = await product.createProduct(info);
      if (result.status) {
        res.send({ success: "Produto criado com sucesso" });
      } else {
        console.log(result);
        throw new Error(result.err);
      }
    } catch (res_error) {
      console.error("Ocorreu um erro: ", res_error);
      res.status(400).json({ "Erro ao inserir o produto": String(res_error) });
    }
  },

  'getProductByCategory' : async (req, res) => {
    try {
      result = await product.getCategoryProduct(req.body.category);
      res.send(result);
    } catch (err) {
      console.log('Ocorreu um erro', err);
    }
  },
};

//CALLS OF METHODS
Router.post(Routes.products.administrator.createProduct, methods_functions.createProduct);
Router.post(Routes.products.all.getProductByCategory, methods_functions.getProductByCategory);

module.exports = Router;
