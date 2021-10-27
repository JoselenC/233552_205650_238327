const PropertyObservedRepository = require('../repositories/propertyObservedRepository');
const RankService = require('../services/rankService');
const AnalyticsService = require('../../../analytics/src/services/analyticsService');
const SensorService = require('../services/sensorService');
const DataCollectedService = require('../services/dataCollectedService');

module.exports = class PropertyObservedService {
    constructor() {
        this.propertyObservedRepository = new PropertyObservedRepository();
        this.rankService = new RankService()
        this.analyticsService = new AnalyticsService()
        this.sensorService = new SensorService()
        this.dataCollectedService = new DataCollectedService()
    }
    async findAll() {
        return await this.propertyObservedRepository.findAll();
    }

    async sendMail(){
        var email = '';
        var password = '';
        var service = '';
        this.analyticsService.sendMail(email, password, service);
    }

    async save(data) {
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
    async findByName(name) {
        return await this.propertyObservedRepository.findByName(name);
    }
}