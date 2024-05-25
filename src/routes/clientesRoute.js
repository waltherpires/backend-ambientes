const express = require("express");
const router = express.Router();
const db = require("../../data.js");

const handleDatabaseError = (res, err) => {
  console.error(err.message);
  res.status(500).send("Erro ao acessar o banco de dados");
};

router.get("/", (req, res) => {
  db.all("SELECT * FROM Clientes", (err, rows) => {
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
    SELECT * FROM Clientes
    WHERE Nome LIKE ? OR Endereco LIKE ? OR Telefone LIKE ? OR Email LIKE ?;
  `;

  const searchParam = `%${parametro}%`;

  db.all(
    query,
    [searchParam, searchParam, searchParam, searchParam],
    (err, rows) => {
      if (err) {
        handleDatabaseError(res, err);
        return;
      }
      res.json(rows);
    },
  );
});

router.post("/", (req, res) => {
  const { nome, sobrenome, endereco, telefone, email } = req.body;
  const query =
    "INSERT INTO Clientes (Nome, Sobrenome, Endereco, Telefone, Email) VALUES (?, ?, ?, ?, ?)";
  db.run(query, [nome, sobrenome, endereco, telefone, email], function (err) {
    if (err) {
      handleDatabaseError(res, err);
      return;
    }
    res.json({ id: this.lastID });
  });
});

module.exports = router;
