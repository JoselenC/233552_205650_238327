const Router = require("koa-router");

const ObservationController = require("./observationsController");

const router = new Router();
const observationController = new ObservationController();

router.get("/observations/consumer", async (consumer, next) => {
  await observationController.findAllByConsumer(consumer, next)
}
);

router.get("/observations", async (ctx, next) => {
  await observationController.getAll(ctx, next)
}
);

router.post("/observations/:esn", async (ctx, next) => {
  await observationController.saveObservation(ctx, next)
    .then((value) => {
      ctx.body = { data: value }
      return value
    }).catch(function (err) {
      ctx.status = 400;
      console.log(err.message)
      ctx.body = { status: 400, message: err.message };
    })
}
);

router.post("/observations", async (ctx, next) => {
  await observationController.saveObservation(ctx, next).then((value) => {
    ctx.body = { data: value }
    return value
  }).catch(function (err) {
    ctx.status = 400;
    ctx.body = { status: 400, message: err.message };
    throw new Error(err.message)
  })
}
);

router.put("/observations/propertyObserved", async (ctx, next) => {
  await observationController.findPropertiesByDateAndSensor(ctx, next)
}
);

module.exports = router;