const AnalyticsService = require("../services/analyticsService");

module.exports = class GatewayController {
  constructor() {
    this.analyticsService = new AnalyticsService();
  }

  async saveAnalytics(ctx, next) {
    try {
      let data = ctx.request.body;
      let analytics = await this.analyticsService.save(data);
      ctx.body = analytics;
      await next();
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
    }
  }

  async getPersonByEmail(ctx, next) {
    try {
      let email = ctx.params.email;
      let analytics = await this.analyticsService.findByEmail(email);
      ctx.body = analytics;
      await next();
    } catch (err) {
      ctx.status = 404;
      ctx.body = { status: 404, message: err.message };
    }
  }
  
}