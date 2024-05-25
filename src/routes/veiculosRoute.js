const express = require("express");
const router = express.Router();
const db = require("../../data.js");

const handleDatabaseError = (res, err) => {
  console.error(err.message);
  res.status(500).send("Erro ao acessar banco de dados");
};

router.get("/", (req, res) => {
  db.all("SELECT * FROM Veiculos", (err, rows) => {
    if (err) {
      handleDatabaseError(res, err);
      return;
    }
    res.json(rows);
  });
});

router.get("/:parametro", (req, res) => {
  const parametro = req.params.parametro;
  const query = `
  SELECT * FROM Veiculos
  WHERE ID = ? OR Modelo = ? OR Marca = ? OR Ano = ? OR Placa = ?;
  `;

  db.all(
    query,
    [parametro, parametro, parametro, parametro, parametro],
    (err, rows) => {
      if (err) {
        handleDatabaseError(res, err);
        return;
      } else {
        res.json(rows);
      }
    },
  );
});

router.post("/", (req, res) => {
  const { modelo, marca, ano, placa, disponibilidade } = req.body;
  db.run(
    "INSERT INTO Veiculos (Modelo, Marca, Ano, Placa, Disponibilidade) VALUES (?, ?, ?, ?, ?)",
    [modelo, marca, ano, placa, disponibilidade],
    function (err) {
      if (err) {
        handleDatabaseError(res, err);
        return;
      }
      res.json({ id: this.lastID });
    },
  );
});

module.exports = router;
