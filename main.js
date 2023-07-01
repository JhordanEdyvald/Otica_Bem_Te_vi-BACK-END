const express = require('express');
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

const products = require('./res/controller/products');
const insta = new products;
insta.getProductObj(2);

const Products = require('./res/controller/products');
const insteste = new Products;

app.get('/',function(req, res){
    res.send({
        'teste': 'testado'
    });
});

app.listen(port , ()=>{
    console.log('escutando na porta ' + port);
});