const ExporterService = require("../services/exporterService");

module.exports = class GatewayController {
  constructor() {
    this.exporterService = new ExporterService();
  }

  async saveConsumer(ctx, next) {
    try {
      let data = ctx.request.body;
      console.log(ctx.request.body)
      let con = await this.exporterService.save(data);
      ctx.body = con;
      await next();
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
    }
  }

  async getConsumersByName(ctx, next) {
    try {
      let name = ctx.params.name;
      let consumer= await this.exporterService.findByName(name);      
      ctx.body = consumer;
      await next();
    } catch (err) {
      ctx.status = 404;
      ctx.body = { status: 404, message: err.message };
    }
  }
}