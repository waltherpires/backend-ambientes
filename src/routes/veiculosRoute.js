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

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { Modelo, Marca, Ano, Placa, Disponibilidade } = req.body;

  db.run(
    "UPDATE Veiculos SET Modelo = ?, Marca = ?, Ano = ?, Placa = ?, Disponibilidade = ? WHERE ID = ?",
    [Modelo, Marca, Ano, Placa, Disponibilidade, id],
    function (err) {
      if (err) {
        handleDatabaseError(res, err);
        return;
      }
      res.json({ success: true });
    },
  );
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM Veiculos WHERE ID = ?", [id], function (err) {
    if (err) {
      handleDatabaseError(res, err);
      return;
    }
    res.sendStatus(200);
  });
});

router.post("/", (req, res) => {
  const { Modelo, Marca, Ano, Placa, Disponibilidade } = req.body;
  db.run(
    "INSERT INTO Veiculos (Modelo, Marca, Ano, Placa, Disponibilidade) VALUES (?, ?, ?, ?, ?)",
    [Modelo, Marca, Ano, Placa, Disponibilidade],
    function (err) {
      if (err) {
        handleDatabaseError(res, err);
        return;
      }
      const veiculo = {
        id: this.lastID,
        modelo: Modelo,
        marca: Marca,
        ano: Ano,
        placa: Placa,
        disponibilidade: Disponibilidade,
      };

      res.json(veiculo);
    },
  );
});

module.exports = router;
