const mongoose = require("mongoose");
const Consumer = mongoose.model(
  "consumers",
  mongoose.Schema({
    Name: { type: String, required: [true, 'Conumer name is required'] },
    Proposito: { type: String, required: [true, 'Conumer Proposito is required'] },
    RegistrationDate: Date,
    URL: String,
    Email: {
      type: String, 
      required: [true, 'Conumer Email is required'],
      unique: [true, 'The email must be unique'],
      match: [/.+\@.+\..+/, 'Enter a valid email']
    },
    Password: { type: String, required: [true, 'Conumer Password is required'] },
    ObserveFrom: Date,
  })
);

module.exports = Consumer;
