const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());
port = process.env.PORT;

(async () => {
  const database = require("./db");
  const product = require("./res/modules/tb_products");
  const assessments = require("./res/modules/assessments");
  const customers = require("./res/modules/tb_customers");
  await database.sync();
})();

//MIDDLEWARE ROUTERS START
const Products_routers = require("./res/routes/products");
app.use(Products_routers);
//MIDDLEWARE ROUTERS END

app.get("/", function (req, res) {
  res.send({
    teste: "testado",
  });
});

app.listen(port, () => {
  console.log("escutando na porta " + port);
});
