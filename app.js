const express = require("express");
const app = express();
const cors = require("cors");

const veiculosRoute = require("./src/routes/veiculosRoute");
const clientesRoute = require("./src/routes/clientesRoute.js");
const reservasRoute = require("./src/routes/reservasRoute.js");

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

app.use("/veiculos", veiculosRoute);
app.use("/reservas", reservasRoute);
app.use("/clientes", clientesRoute);

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
