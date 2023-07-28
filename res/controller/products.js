const tb_products = require("../modules/tb_products");
const assessment = require("../modules/assessments");

class Products {
   async getCategoryProduct(category){
    try{
      const arrayProducts = await tb_products.findAll({where: {'category': category}});
      const objectResolve = arrayProducts.map((element)=>{
        return this.getProductObj(element.dataValues.id);
      });
      const products = await Promise.all(objectResolve);
      return products;
    }catch (error){
      console.error('erro: '+ error);
      throw error;
    }
  };

  async getProductObj(id) {
    let objectInfoProducts = {};
    const success = await tb_products.findAll({ where: { id: id } });
    objectInfoProducts["id"] = success[0].dataValues.id;
    objectInfoProducts["img"] = success[0].dataValues.imgProduct;
    objectInfoProducts["title"] = success[0].dataValues.nameProduct;
    objectInfoProducts["installments"] = success[0].dataValues.installments;
    objectInfoProducts["price"] = success[0].dataValues.price;
    objectInfoProducts["lastPrice"] = success[0].dataValues.lastPrice;
    objectInfoProducts["assessments"] = await Products.processAssessments(id);
    return objectInfoProducts;
  };

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
  };

  async createProduct(object) {
    try {
      const createdProduct = await tb_products.create(object);
      return {'status': true};
    } catch (error) {
      const all_errors = error.errors.map((item)=>{
        return item.message;
      }).join(' |\n   ');
      console.error("Erro ao inserir o produto: ", all_errors);
      return {'status':false, 'err': all_errors};
    }
  };

  async createAssessment(object) {
    try{
      const assessmentUser = await assessment.findOne({
        where: { idProduct: object.idProduct, idUser: object.idUser },
        attributes: ["id" ,"idUser", "assessment"],
      });
      if(assessmentUser){
        if(assessmentUser.assessment != object.assessment){
          assessmentUser.assessment = object.assessment;
          await assessmentUser.save();
          return {'status': true, 'info': 'Avaliação substituida com sucesso!'};
        }else{
          throw 'você não pode inserir a mesma avaliação que já tinha dado!';
        }
      }
    }catch(err){
      console.log(err);
      return {'status': false, 'err': err};
    }
    try {
      const createdAssessment = await assessment.create(object);
      return {'status': true, 'info': 'Avaliação cadastrada com sucesso!'}
    } catch (error) {
      console.error("Erro ao inserir a avaliacao: ", error);
      return {'status':false, 'err': error};
    }
  };
  
}

module.exports = Products;
