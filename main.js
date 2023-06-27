const express = require('express');
require('dotenv').config();
const database = require('./db');
const app = express();
app.use(express.json());
port = process.env.PORT;

(async ()=>{
    const product = require('./res/modules/tb_products');
    await database.sync();
})();

app.get('/',function(req, res){
    res.send('teste');
});

app.listen(port , ()=>{
    console.log('escutando na porta ' + port);
});