const Router = require("koa-router");

const AnalyticsController = require("./analyticsController");

const router = new Router();
const analyticsController = new AnalyticsController();

router.post("/analytics/person", async (ctx, next) => 
  await analyticsController.savePerson(ctx, next)
);


router.post("/analytics/person/:email", async (ctx, next) => {
  await analyticsController.deletePerson(ctx, next)
}
);

router.get("/analytics/person/:email", async (ctx, next) => {
  await analyticsController.getPersonByEmail(ctx, next)
}
);

router.post("/analytics/averages/:criterion", async (ctx, next) => {
  await analyticsController.calculateAverageValues(ctx, next)
}
);

module.exports = router;