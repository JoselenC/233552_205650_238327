const ExporterService = require("../services/exporterService");
const createLogger = require("../../../logger/log");
const axios = require("axios");


module.exports = class GatewayController {
  constructor() {
    this.exporterService = new ExporterService();
    this.secret = process.env.TOKEN_SECRET;
  }

  async login(ctx, next) {
    try {
      let data = ctx.request.body;
      let consumer = await this.exporterService.login(data);
      if (consumer) {
        ctx.set("Authorization", consumer);
        ctx.body = consumer;
        createLogger.info(`${ctx.request.method} on url ${ctx.request.url}`);
      } else {
        ctx.status = 400;
        ctx.body = { status: 400, message: `Invalid consumer data` };
        createLogger.error(
          `${ctx.request.method} on url ${ctx.request.url} -> ${ctx.body.message}`
        );
      }
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
      createLogger.error(
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
      await next();
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
      createLogger.error(
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
      ctx.body = { data:list.data };
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

  async getData2(ctx, next) {
    try {
      let decode = decodeJwt(ctx.get("Authorization"), this.secret);
      console.log(decode)
      let data = ctx.request.body;
      let con = await this.exporterService.getData();
      if (con) {
        ctx.body = con;
        createLogger.info(`${ctx.request.method} on url ${ctx.request.url}`);

      } else {
        ctx.status = 400;
        ctx.body = { status: 400, message: "No permission" };
        createLogger.error(
          `${ctx.request.method} on url ${ctx.request.url} -> ${ctx.body.message}`
        );
      }
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
      createLogger.error(
        `${ctx.request.method} on url ${ctx.request.url} -> ${ctx.body.message}`
      );
    }
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

function decodeJwt(token, secret) {
  if (token == "") {
    throw new Error("You need to be logged-in");
  } else {
    return jwt.verify(token, secret);
  }
}