const DataCollectedService = require("../services/dataCollectedService");

module.exports = class GatewayController {
  constructor() {
    this.dataCollectedService = new DataCollectedService();
  }

  async saveDataCollected(ctx, next) {
    try {
      let data = ctx.request.body;
      let observation = await this.dataCollectedService.save(data);
      ctx.body = observation;
      await next();
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
    }
  }  
}