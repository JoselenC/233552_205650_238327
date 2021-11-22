const GatewayService = require("../services/gatewayService");
const log = require("../logger/log");

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
      log.error(
        `${ctx.request.method} on url ${ctx.request.url} -> ${err.message}`
      );
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
      log.error(
        `${ctx.request.method} on url ${ctx.request.url} -> ${err.message}`
      );
    }
  }

  async deletePerson(ctx, next) {
    try {
      let message = await this.gatewayService.deletePerson(ctx)
      ctx.body = {data: message};
      await next();
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
      log.error(
        `${ctx.request.method} on url ${ctx.request.url} -> ${err.message}`
      );
    }
  }

  async saveSensor(ctx, next) {
    try {
      let message = await this.gatewayService.saveSensor(ctx)
      ctx.body = {data: message};
      await next();
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
      log.error(
        `${ctx.request.method} on url ${ctx.request.url} -> ${err.message}`
      );
    }
  }

  async saveProperty(ctx, next) {
    try {
      let message = await this.gatewayService.saveProperty(ctx)
      ctx.body = {data: message};
      await next();
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
      log.error(
        `${ctx.request.method} on url ${ctx.request.url} -> ${err.message}`
      );
    }
  }

  async saveRank(ctx, next) {
    try {
      let message = await this.gatewayService.saveRank(ctx)
      ctx.body = {data: message};
      await next();
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
      log.error(
        `${ctx.request.method} on url ${ctx.request.url} -> ${err.message}`
      );
    }
  }

  async saveObservation(ctx, next) {
      await this.gatewayService.saveObservation(ctx)    
      .then((value) => {
        ctx.body = { data: value }
      }).catch(function (err) {
        ctx.status = 404;
        ctx.body = { status: 404, message: err.message };
        log.error(
          `${ctx.request.method} on url ${ctx.request.url} -> ${err.message}`
        );
      })
  }
  
  async calculateAverageValues(ctx, next) {
    try {
      let average = await this.gatewayService.calculateAverageValues(ctx);
      ctx.body = average;
      await next();
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
      log.error(
        `${ctx.request.method} on url ${ctx.request.url} -> ${err.message}`
      );
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
      log.error(
        `${ctx.request.method} on url ${ctx.request.url} -> ${err.message}`
      );
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
      log.error(
        `${ctx.request.method} on url ${ctx.request.url} -> ${err.message}`
      );
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
      log.error(
        `${ctx.request.method} on url ${ctx.request.url} -> ${err.message}`
      );
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
      log.error(
        `${ctx.request.method} on url ${ctx.request.url} -> ${err.message}`
      );
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
      log.error(
        `${ctx.request.method} on url ${ctx.request.url} -> ${err.message}`
      );
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
      log.error(
        `${ctx.request.method} on url ${ctx.request.url} -> ${err.message}`
      );
    }
  }

  async login(ctx, next) {
    try {
      let data = ctx.request.body;
      let token = await this.gatewayService.login(data);
      if (token) {
        ctx.set("Authentication", token);
        ctx.body = token;
        log.info(`${ctx.request.method} on url ${ctx.request.url}`);
      } else {
        ctx.status = 400;
        ctx.body = { status: 400, message: "Invalid consume" };
        log.error(
          `Invalid consumer on url ${ctx.request.url} -> ${err.message}`
        );
      }
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message};
      log.error(
        `${ctx.request.method} on url ${ctx.request.url} -> ${err.message}`
      );
    }
  }
};
