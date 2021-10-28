const PropertyObservedRepository = require('../repositories/propertyObservedRepository');
const RankService = require('../services/rankService');
const AnalyticsService = require('../../../analytics/src/services/analyticsService');
const SensorService = require('../services/sensorService');
const DataCollectedService = require('../services/dataCollectedService');

module.exports = class PropertyObservedService {
    constructor() {
        this.propertyObservedRepository = new PropertyObservedRepository();
        this.analyticsService = new AnalyticsService()
    }
    async findAll() {
        return await this.propertyObservedRepository.findAll();
    }

    async save(data) {
<<<<<<< Updated upstream
        if (this.sensorService.exist(data.sensor)) {
            const rank = this.rankService.findByProperty(data.propertyObserved);
            if (data.value > rank.finalValue || data.value < rank.initialValue) 
                await sendMail();
            else 
                return await this.propertyObservedRepository.save(data);
        }
        else {
            throw new console.error('Sensor' + data.sensor + 'not registered in the system');
        }
    }
    
=======

        return await this.propertyObservedRepository.save(data);
    }

>>>>>>> Stashed changes
    async findByName(name) {
        return await this.propertyObservedRepository.findByName(name);
    }
}