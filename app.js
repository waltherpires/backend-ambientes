const express = require("express");
const veiculosRoute = require("./src/routes/veiculosRoute");

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/veiculos", veiculosRoute);

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
