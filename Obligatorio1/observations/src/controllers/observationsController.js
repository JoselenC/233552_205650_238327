const ObservationService = require("../services/observationService");

module.exports = class GatewayController {
  constructor() {
    this.observationService = new ObservationService();
  }

  async saveObservation(ctx, next) {
    try {
      let data = ctx.request.body;
      let esn = ctx.params.esn;
      if (esn == null)
        esn = ctx.request.header.esn;
      if (esn == null)
        throw new Error("Invalid empty esn");
      let observation = await this.observationService.save(data, esn);
      ctx.body = observation;
      await next();
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
    }
  }
}