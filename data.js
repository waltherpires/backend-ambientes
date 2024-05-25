// database.js

const sqlite3 = require("sqlite3").verbose();

// Crie a instância do banco de dados
const db = new sqlite3.Database("./locadoraveiculos.db", (err) => {
  if (err) {
    console.error("Erro ao abrir o banco de dados:", err.message);
  } else {
    console.log("Conexão com o banco de dados estabelecida com sucesso");
  }
});

module.exports = db;
