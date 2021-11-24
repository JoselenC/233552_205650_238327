const mongoose = require('mongoose')

const sensorSchema = new mongoose.Schema({
    ESN: {
        type: String,
    },
    name: { 
        type: String 
    },
    unit: { 
        type: String 
    },
    value: {
        type: Number
    }
})

module.exports = mongoose.model('Sensor', sensorSchema)