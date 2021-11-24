const mongoose = require("mongoose");

const Observation = mongoose.model(
    'observation',  mongoose.Schema({
        registrationDate: Date,
        name: String,
        unit: String,
        value: Number,
        standarizedUnit:  String,
        standarizedData:  Number,
        time: Number,
        ESN: String,
        path:String
    })
);

module.exports = Observation;