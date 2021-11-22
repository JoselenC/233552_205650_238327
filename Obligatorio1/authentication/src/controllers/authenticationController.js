const createLogger = require("../logger/log");

const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = class AuthenticationController {
  constructor() {
    this.secret = process.env.JWT_SECRET;
  }


  async authenticate(ctx, next) {
    try {
      let token = ctx.request.body.request.header.authentication;
      decodeJwt(token, this.secret);
      createLogger.info(
        `${ctx.request.method} on url ${ctx.request.url} `
      );
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
      createLogger.error(
        `${ctx.request.method} on url ${ctx.request.url}-> ${err.message}`
      );
    }
  }
}

function decodeJwt(token, secret) {
  if (token == "") {
    throw new Error("Log in to use this function");
  } else {
    return jwt.verify(token, secret);
  }
}