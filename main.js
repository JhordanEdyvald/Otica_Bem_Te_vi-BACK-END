const express = require('express');
const router = express.Router();
require('dotenv').config();
const app = express();
app.use(express.json());
port = process.env.PORT;

(async ()=>{
    const database = require('./db');
    const product = require('./res/modules/tb_products');
    const assessments = require('./res/modules/assessments');
    await database.sync();
})();

const Routes = require('./res/routes/Config');
const products = require('./res/controller/products');
const controllerProducts = new products;


Promise.resolve(controllerProducts.createProductRoute()).then((res)=>{
    router.post(Routes.products.createProduct, res);
});


app.get('/',function(req, res){
    res.send({
        'teste': 'testado'
    });
});

app.use(router);

app.listen(port , ()=>{
    console.log('escutando na porta ' + port);
});