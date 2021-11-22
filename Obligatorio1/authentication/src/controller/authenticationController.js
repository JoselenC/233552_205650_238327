const AuthenticationService = require("../services/authenticationService");
const log = require("../logger/log");
const axios = require("axios");


module.exports = class AuthenticationController {
  constructor() {
    this.authenticationService = new AuthenticationService();
    this.secret = process.env.TOKEN_SECRET;
  }


  async getData2(ctx, next) {
    try {
      let decode = decodeJwt(ctx.get("Authetication"), this.secret);
      console.log(decode)
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
      createLogger.error(
        `${ctx.request.method} on url ${ctx.request.url} -> ${ctx.body.message}`
      );
    }
  }
}

function decodeJwt(token, secret) {
  if (token == "") {
    throw new Error("You need to be logged-in");
  } else {
    return jwt.verify(token, secret);
  }
}