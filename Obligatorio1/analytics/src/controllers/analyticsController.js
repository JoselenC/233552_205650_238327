const DataCollectedService = require("../../../observations/src/services/dataCollectedService");
const AnalyticsService = require("../services/analyticsService");

module.exports = class GatewayController {
  constructor() {
    this.dataCollectedService = new DataCollectedService();
    this.analyticsService = new AnalyticsService();
  }

  async saveAnalytics(ctx, next) {
    try {
      let data = ctx.request.body;
      let person = await this.analyticsService.save(data);
      ctx.body = person;
      await next();
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
    }
  }

  async getPersonByEmail(ctx, next) {
    try {
      let email = ctx.params.email;
      let person = await this.analyticsService.findByEmail(email);
      ctx.body = person;
      await next();
    } catch (err) {
      ctx.status = 404;
      ctx.body = { status: 404, message: err.message };
    }
  }



async calculateAverageValues(ctx, next) {
    try {
      let startDate = ctx.params.startDate;
      let endDate = ctx.params.endDate;
      let observedProperty = ctx.params.observedProperty;
      let sensor = ctx.params.sensor;
      let values = await this.dataCollectedService.findObservedPropertiesByDateAndSensor(startDate, endDate, observedProperty, sensor);
      let dailyAverage = await this.analyticsService.calculateDailyAverage(values, startDate, endDate);
      let monthlyAverage = await this.analyticsService.calculateMonthlyAverage(values, startDate, endDate);
      let annualAverage = await this.analyticsService.calculateAnnualAverage(values, startDate, endDate);
      ctx.body = {
        DailyAverage: dailyAverage,
        MonthlyAverage: monthlyAverage,
        AnnualAverage: annualAverage
      }
      await next();
    } catch(err){
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
    }
  }
  
}