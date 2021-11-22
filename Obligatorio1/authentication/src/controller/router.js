const Router = require("koa-router");
const AutheticationController = require("./authenticationController");

const router = new Router();
const authenticationController = new AutheticationController();

router.post("/login", async (ctx, next) => {
  await authenticationController.login(ctx, next)
}
);