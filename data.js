const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./locadoraveiculos.db", (err) => {
  if (err) {
    console.error("Erro ao abrir o banco de dados:", err.message);
  } else {
    console.log("Conexão com o banco de dados estabelecida com sucesso");
  }
});

module.exports = db;
