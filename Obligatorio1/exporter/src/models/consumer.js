const mongoose = require("mongoose");
const Consumer = mongoose.model(
  "consumers",
  mongoose.Schema({
    Name: String,
    Propsito: String,
    FechaRegistro: String,
    URL: String
  })
);

module.exports = Consumer;
