const mongoose = require("mongoose");
const PersonNotify = mongoose.model(
  "personsNotify",
  mongoose.Schema({
    Name: String,
    Email: String,
  })
);

module.exports = PersonNotify;
