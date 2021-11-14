const ExporterService = require("../services/exporterService");
const logger = require("../../logger/logger");

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
        logger.info(`${ctx.request.method} on url ${ctx.request.url}`);
      } else {
        ctx.status = 400;
        ctx.body = { status: 400, message: `Invalid consumer data` };
        logger.error(
          `${ctx.request.method} on url ${ctx.request.url} -> ${ctx.body.message}`
        );
      }
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
      logger.error(
        `${ctx.request.method} on url ${ctx.request.url} -> ${ctx.body.message}`
      );
    }
  }


  async saveConsumer(ctx, next) {
    try {
      let data = ctx.request.body;
      let con = await this.exporterService.saveConsumer(data);
      if (con) {
        ctx.body = con;
        logger.info(`${ctx.request.method} on url ${ctx.request.url}`);
      } else {
        ctx.status = 400;
        ctx.body = { status: 400, message: `Invalid con data` };
        logger.error(
          `${ctx.request.method} on url ${ctx.request.url} -> ${ctx.body.message}`
        );
      }
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
      logger.error(
        `${ctx.request.method} on url ${ctx.request.url} -> ${ctx.body.message}`
      );
    }
  }


  async getData(ctx, next) {
    try {
      let decode = decodeJwt(ctx.get("Authorization"), this.secret);
      let data = ctx.request.body;
      let con = await this.exporterService.getData();
      if (con) {
        ctx.body = con;
        logger.info(`${ctx.request.method} on url ${ctx.request.url}`);

      } else {
        ctx.status = 400;
        ctx.body = { status: 400, message: "No permission" };
        logger.error(
          `${ctx.request.method} on url ${ctx.request.url} -> ${ctx.body.message}`
        );
      }
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
      logger.error(
        `${ctx.request.method} on url ${ctx.request.url} -> ${ctx.body.message}`
      );
    }
  }

  async getConsumersByName(ctx, next) {
    try {
      let name = ctx.params.name;
      let consumer = await this.exporterService.findByName(name);
      ctx.body = consumer;
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