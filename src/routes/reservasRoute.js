const express = require("express");
const router = express.Router();
const db = require("../../data.js");

const handleDatabaseError = (res, err) => {
  console.error(err.message);
  res.status(500).send("Erro ao acessar o banco de dados");
};

router.get("/", (req, res) => {
  db.all("SELECT * FROM Reservas", (err, rows) => {
    if (err) {
      handleDatabaseError(res, err);
      return;
    }
    res.json(rows);
  });
});

router.get("/datainicio/:dataInicio", (req, res) => {
  const dataInicio = req.params.dataInicio;
  const query = "SELECT * FROM Reservas WHERE DataInicio = ?";
  db.all(query, [dataInicio], (err, rows) => {
    if (err) {
      handleDatabaseError(res, err);
      return;
    }
    res.json(rows);
  });
});

router.get("/status/:status", (req, res) => {
  const status = req.params.status;
  const query = "SELECT * FROM Reservas WHERE Status = ?";
  db.all(query, [status], (err, rows) => {
    if (err) {
      handleDatabaseError(res, err);
      return;
    }
    res.json(rows);
  });
});

router.post("/", (req, res) => {
  const { IDCliente, IDVeiculo, DataInicio, DataTermino, Status } = req.body;
  const query =
    "INSERT INTO Reservas (IDCliente, IDVeiculo, DataInicio, DataTermino, Status) VALUES (?, ?, ?, ?, ?)";
  db.run(
    query,
    [IDCliente, IDVeiculo, DataInicio, DataTermino, Status],
    function (err) {
      if (err) {
        handleDatabaseError(res, err);
        return;
      }
      res.json({ id: this.lastID });
    },
  );
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM Reservas WHERE ID = ?";
  db.get(query, [id], (err, row) => {
    if (err) {
      handleDatabaseError(res, err);
      return;
    }
    if (!row) {
      res.status(404).send("Reserva não encontrada");
      return;
    }
    res.json(row);
  });
});

module.exports = router;
