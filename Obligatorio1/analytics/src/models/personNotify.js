const mongoose = require("mongoose");
const PersonNotify = mongoose.model(
  "personsNotify",
  mongoose.Schema({
    Name: { type: String, required: [true, 'Person name is required'] },
    Email: {
      type: String, 
      required: [true, 'Person Email is required'],
      unique: [true, 'The email must be unique'],
      match: [/.+\@.+\..+/, 'Enter a valid email']
    }
  })
);

module.exports = PersonNotify;
