const express = require("express");
const veiculosRoute = require("./src/routes/veiculosRoute");
const clientesRoute = require("./src/routes/clientesRoute.js");
const reservasRoute = require("./src/routes/reservasRoute.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/veiculos", veiculosRoute);
app.use("/reservas", reservasRoute);
app.use("/clientes", clientesRoute);

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
