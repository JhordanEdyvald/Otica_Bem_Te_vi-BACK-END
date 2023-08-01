const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());

(async () => {
  const database = require("./db");
  const product = require("./res/modules/tb_products");
  const assessments = require("./res/modules/assessments");
  const customers = require("./res/modules/tb_customers");
  const userAcess = require("./res/modules/tb_userAcess");
  const permissions = require("./res/modules/tb_permissions");
  const Client = require("./res/modules/tb_client");
  await database.sync();
})();



const callFunction = require("./res/controller/client");
const InsFunc = new callFunction();
InsFunc.instertClient({
  idCustomer: 2,
  rule: 'customer',
  auth: { email: "luffy@strawhat.com", password: "kingofpiratesgomogomo" },
});

//MIDDLEWARE ROUTERS START
const Products_routers = require("./res/routes/products");
app.use(Products_routers);
const Custumers_routers = require("./res/routes/customer");
app.use(Custumers_routers);
//MIDDLEWARE ROUTERS END

app.get("/", function (req, res) {
  res.send({
    teste: "testado",
  });
});

app.listen(process.env.PORT);
