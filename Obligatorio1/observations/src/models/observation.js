const mongoose = require("mongoose");

const Observation = mongoose.model(
    'observation',  mongoose.Schema({
        registrationDate: Date,
        name: { type: String, required: [true, 'observation name is required'] },
        unit: { type: String, required: [true, 'observation unit is required'] },
        value: { type: Number, required: [true, 'observation value is required'] },
        standarizedUnit:  String,
        standarizedData:  Number,
        time: Number,
        ESN: String,
        path:String
    })
);

module.exports = Observation;