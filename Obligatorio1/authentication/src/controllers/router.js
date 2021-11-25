const Router = require("koa-router");
const router = new Router();

const AutheticationController = require("./authenticationController");
const authenticationController = new AutheticationController();

router.post("/authentication", async (ctx, next) => {
  
  await authenticationController.authenticate(ctx, next)
}
);

module.exports = router;