const { emulateSensorData } = require('./services/emulatorService');
const repository = require('./repositories/emulatorRepository');
const env = require('./config/env');

(async () => {
    var sensorModel = await repository.initRepository();
    var data = await sensorModel.find();
    if (data.length > 0){
        emulateSensorData(data);
    }
})();