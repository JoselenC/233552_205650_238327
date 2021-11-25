
const ObservationService = require("../../../observations/src/services/observationService");
const AnalyticsService = require("../services/analyticsService");
const axios = require("axios");


module.exports = class AnalyticsController {
  constructor() {
    this.observationService = new ObservationService();
    this.analyticsService = new AnalyticsService();
  }

  async savePerson(ctx, next) {
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

  async deletePerson(ctx, next) {
    try {
      let email = ctx.params.email;
      let person = await this.analyticsService.delete(email);
      ctx.body = { data: "delete person"+ email };
      await next();
    } catch (err) {
      ctx.status = 404;
      ctx.body = { status: 404, message: err.message };
    }
  }

  async getPersonByEmail(ctx, next) {
    try {
      let email = ctx.params.email;
      let person = await this.analyticsService.findByEmail(email);
      ctx.body = { data: person };
      await next();
    } catch (err) {
      ctx.status = 404;
      ctx.body = { status: 404, message: err.message };
    }
  }

  async observationsByDate(data) {
    return new Promise(async (resolve, reject) => {
      return axios
        .put(`http://localhost:6067/observations/propertyObserved`, data)
        .then((response) => {
          if (response.data.data === undefined || response.data.length === 0) {
            reject(new Error("No data found"));
          } else {
            resolve(response.data);
          }
        })
        .catch((error) => {
          reject(new Error(error.message));
        });
    });
  }

  async calculateAverageValues(ctx, next) {
    try {
      let data = ctx.request.body;
      let observations = await this.observationsByDate(data)
      if (observations != null)
        observations.data.sort((a, b) => new Date(a.fechas).getTime() < new Date(b.fechas).getTime());
      else {
        ctx.status = 404;
        ctx.body = { status: 404, message: "There are no observations for those data" };
      }
      let dailyAverage
      let criterion = ctx.params.criterion.toLowerCase();
      if (criterion == "day" || criterion == "days")
        dailyAverage = await this.analyticsService.calculateDailyAverage(observations.data, data);
      else if (criterion == "month" || criterion == "months")
        dailyAverage = await this.analyticsService.calculateMonthlyAverage(observations.data, data);
      else if (criterion == "year" || criterion == "years")
        dailyAverage = await this.analyticsService.calculateAnnualAverage(observations.data, data);
      else {
        ctx.status = 404;
        ctx.body = { status: 404, message: "Criterion not recognized" };
      }
      ctx.body = { data: dailyAverage }
      await next();
    } catch (err) {
      console.log(err.message)
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
    }

  }


}