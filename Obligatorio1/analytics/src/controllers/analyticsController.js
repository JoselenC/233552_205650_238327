const { data } = require("../../../logger/log");
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

  async calculateAverageValues(ctx, next) {
    try {
      let data = ctx.request.body;
      let observations = await this.observationService.findPropertiesByDateAndSensor(data);
      if (observations != null)
        observations.sort((a, b) => new Date(a.fechas).getTime() < new Date(b.fechas).getTime());
      else {
        ctx.status = 404;
        ctx.body = { status: 404, message: "There are no observations for those data" };
      }
      let dailyAverage
      let criterion=ctx.params.criterion.toLowerCase();
      if (criterion == "day" || criterion == "days")
        dailyAverage = await this.analyticsService.calculateDailyAverage(observations, data);
      else if (criterion == "month" || criterion == "months")
        dailyAverage = await this.analyticsService.calculateMonthlyAverage(observations, data);
      else if (criterion== "year" || criterion == "years")
        dailyAverage = await this.analyticsService.calculateAnnualAverage(observations, data);
      else {
        ctx.status = 404;
        ctx.body = { status: 404, message: "Criterion not recognized" };
      }
      ctx.body = { data: dailyAverage }
      await next();
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
    }

  }


}