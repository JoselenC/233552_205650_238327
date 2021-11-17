const ObservationService = require("../../../observations/src/services/observationService");
const AnalyticsService = require("../services/analyticsService");

module.exports = class AnalyticsController {
  constructor() {
    this.observationService = new ObservationService();
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



  async calculateAverageValuesDays(ctx, next) {
    try {
      let data = ctx.request.body;
      let cantDays = ctx.params.cantDays;
      if (cantDays > 0) {
        let observations = await this.observationService.findPropertiesByDateAndSensor(data);
        if (observations != null) {
          observations.sort((a, b) => new Date(a.fechas).getTime() < new Date(b.fechas).getTime());
        } else{
          ctx.status = 404;
          ctx.body = { status: 404, message: "There are no observations for those data"};
        }
        let dailyAverage = await this.analyticsService.calculateDailyAverage(observations, data, cantDays);
        ctx.body = { data: dailyAverage }
        await next();
      }
      else {
        ctx.status = 200;
        ctx.body = { status: 200, message: "number of zero days without information"};
      }
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
    }

  }

  async calculateAverageValuesMonts(ctx, next) {
    try {
      let data = ctx.request.body;
      let cantMonts = ctx.params.cantMonts;
      if (cantMonts > 0) {
        let observations = await this.observationService.findPropertiesByDateAndSensor(data);
        if (observations != null) {
          observations.sort((a, b) => new Date(a.fechas).getTime() < new Date(b.fechas).getTime());
        } else{
          ctx.status = 404;
          ctx.body = { status: 404, message: "There are no observations for those data"};
        }
        let dailyAverage = await this.analyticsService.calculateMonthlyAverage(observations, data, cantDays);
        ctx.body = { data: dailyAverage }
        await next();
      }
      else {
        ctx.status = 200;
        ctx.body = { status: 200, message: "number of zero days without information"};
      }
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
    }
  }

  async calculateAverageValuesYears(ctx, next) {
    try {
      let data = ctx.request.body;
      let cantYears = ctx.params.cantYears;
      if (cantYears > 0) {
        let observations = await this.observationService.findPropertiesByDateAndSensor(data);
        if (observations != null) {
          observations.sort((a, b) => new Date(a.fechas).getTime() < new Date(b.fechas).getTime());
        } else{
          ctx.status = 404;
          ctx.body = { status: 404, message: "There are no observations for those data"};
        }
        let dailyAverage = await this.analyticsService.calculateAnnualAverage(observations, data, cantDays);
        ctx.body = { data: dailyAverage }
        await next();
      }
      else {
        ctx.status = 200;
        ctx.body = { status: 200, message: "number of zero days without information"};
      }
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
    }
  }

}