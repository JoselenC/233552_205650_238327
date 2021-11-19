const GatewayService = require("../services/gatewayService");

module.exports = class GatewayController {
  constructor() {
    this.gatewayService = new GatewayService();
  }

  async saveConsumer(ctx, next) {
    try {
      let data = ctx.request.body;
      let message = await this.gatewayService.saveConsumer(data);
      ctx.body = {data: message};
      await next();
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
    }
  }

  async savePerson(ctx, next) {
    try {
      let data = ctx.request.body;
      let message = await this.gatewayService.savePerson(data)
      ctx.body = {data: message};
      await next();
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
    }
  }

  async saveSensor(ctx, next) {
    try {
      let data = ctx.request.body;
      let message = await this.gatewayService.saveSensor(data)
      ctx.body = {data: message};
      await next();
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
    }
  }

  async saveProperty(ctx, next) {
    try {
      let data = ctx.request.body;
      let message = await this.gatewayService.saveProperty(data)
      ctx.body = {data: message};
      await next();
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
    }
  }

  async saveRank(ctx, next) {
    try {
      let data = ctx.request.body;
      let message = await this.gatewayService.saveRank(data)
      ctx.body = {data: message};
      await next();
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
    }
  }

  async saveObservation(ctx, next) {
    try {
      let data = ctx.request.body;
      let esn = ctx.params.esn;
      let message = await this.gatewayService.saveObservation(data,esn)
      ctx.body = {data: message};
      await next();
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
    }
  }
  
  async calculateAverageValues(ctx, next) {
    try {
      let data = ctx.request.body;
      let criterion = ctx.params.criterion;
      let average = await this.gatewayService.calculateAverageValues(data,criterion);
      ctx.body = average;
      await next();
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
    }
  }

  async getAllProperties(ctx, next) {
    try {
      let data = await this.gatewayService.getAllProperties(ctx);
      ctx.body = data;
      await next();
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
    }
  }

  async getAllSensors(ctx, next) {
    try {
      let data = await this.gatewayService.getAllSensors(ctx);
      ctx.body = data;
      await next();
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
    }
  }

  async getAllRanks(ctx, next) {
    try {
      let data = await this.gatewayService.getAllRanks(ctx);
      ctx.body = data;
      await next();
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
    }
  }

  async getPersonByEmail(ctx, next) {
    try {
      let data = await this.gatewayService.getPersonByEmail(ctx);
      ctx.body = data;
      await next();
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
    }
  }
  
  async getConsumer(ctx, next) {
    try {
      let data = await this.gatewayService.getConsumers(ctx);
      ctx.body = data;
      await next();
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
    }
  }







 


  async getData(ctx, next) {
    try {
      let data = await this.gatewayService.getData(ctx);
      ctx.body = data;
      await next();
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
    }
  }

  async getAll(ctx, next) {
    try {
      let data = await this.gatewayService.getAll(ctx);
      ctx.body = data;
      await next();
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
    }
  }



};
