const Sequelize = require("sequelize");
const database = require("../../db");
const tb_products = require("../modules/tb_products");
const assessment = require("../modules/assessments");

class Products {
  async getProductObj(id) {
    let objectInfoProducts = {};
    const tb_product = await tb_products
      .findAll({ where: { id: id } })
      .then((success) => {
        objectInfoProducts["id"] = success[0].dataValues.id;
        objectInfoProducts["img"] = success[0].dataValues.imgProduct;
        objectInfoProducts["title"] = success[0].dataValues.nameProduct;
        objectInfoProducts["installments"] = success[0].dataValues.installments;
        objectInfoProducts["lastPrice"] = success[0].dataValues.lastPrice;
        objectInfoProducts["assessments"] = {};
      })
      .catch((err) => {
        console.log(err);
      });
    objectInfoProducts["assessments"] = await Products.processAssessments(id);
    console.log(objectInfoProducts);
  }

  static async processAssessments(id_product) {
    let objectAssessments = {
      first: 0,
      second: 0,
      third: 0,
      fourth: 0,
      fifth: 0,
    };
    const tb_assessment = await assessment
      .findAll({ where: { idProduct: id_product } })
      .then((success) => {
        success.forEach((element) => {
          switch (element.dataValues.assessment) {
            case 1:
              objectAssessments["first"] += 1;
              break;
            case 2:
              objectAssessments["second"] += 1;
              break;
            case 3:
              objectAssessments["third"] += 1;
              break;
            case 4:
              objectAssessments["fourth"] += 1;
              break;
            case 5:
              objectAssessments["fifth"] += 1;
              break;
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
    return objectAssessments;
  }

  async createProduct(object) {
    try {
      const createdProduct = await tb_products.create(object);
    } catch (error) {
      console.error("Erro ao inserir o produto: ", error);
    }
  }

  async createAssessment(object) {
    try {
      const createdAssessment = await assessment.create(object);
    } catch (error) {
      console.error("Erro ao inserir a avaliacao: ", error);
    }
  }
}

module.exports = Products;
