const mongoose = require("mongoose");
const Consumer = mongoose.model(
  "consumers",
  mongoose.Schema({
    Name: String,
    Proposito: String,
    FechaRegistro: String,
    URL: String
  })
);

module.exports = Consumer;
