const ExporterService = require("../services/exporterService");
const log = require("../logger/log");
const axios = require("axios");


module.exports = class GatewayController {
  constructor() {
    this.exporterService = new ExporterService();
    this.secret = process.env.TOKEN_SECRET;
  }

  async login(ctx) {
    try {
      let data = ctx.request.body;
      let token = await this.exporterService.login(data);
      ctx.body = { token: token };
      log.info(`${ctx.request.method} on url ${ctx.request.url}`);
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
      log.error(
        `${ctx.request.method} on url ${ctx.request.url} -> ${ctx.body.message}`
      );
    }
  }


  async save(ctx, next) {
    try {
      let data = ctx.request.body;
      data.RegistrationDate = Date.now();
      data.ObserveFrom = Date.now();
      let con = await this.exporterService.saveConsumer(data);
      ctx.body = con;
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
      log.error(
        `${ctx.request.method} on url ${ctx.request.url} -> ${ctx.body.message}`
      );
    }
  }

  async getData(ctx, next) {
    try {
      let email = ctx.params.email;
      let consumer = await this.exporterService.findByEmail(email);
      let list = await this.getObservationsData(consumer);
      consumer.ObserveFrom = Date.now();
      await consumer.save()
      ctx.body = { data: list.data };
      return list
    } catch (err) {
      console.log(err.message)
      ctx.status = 404;
      ctx.body = { status: 404, message: err.message };
    }

  }

  async getObservationsData(consumer) {
    return new Promise(async (resolve, reject) => {
      return axios
        .get(`http://localhost:6067/observations/consumer/${consumer.ObserveFrom}`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(new Error(error.message));
        });
    });
  }

  async getConsumersByEmail(ctx, next) {
    try {
      let email = ctx.params.email;
      let consumer = await this.exporterService.findByEmail(email);
      ctx.body = { data: consumer };
      await next();
    } catch (err) {
      ctx.status = 404;
      ctx.body = { status: 404, message: err.message };
    }
  }
};

