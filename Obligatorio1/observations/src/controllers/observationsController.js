const ObservationService = require("../services/observationService");

module.exports = class GatewayController {
  constructor() {
    this.observationService = new ObservationService();
  }

  async saveObservation(ctx, next) {
    try {
      let data = ctx.request.body;
      let observation = await this.observationService.save(data);
      ctx.body = observation;
      await next();
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
    }
  }  
}