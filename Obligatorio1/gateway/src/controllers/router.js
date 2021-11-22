const Router = require("koa-router");
const router = new Router();
const GatewayController = require("./gatewayController");
const gatewayController = new GatewayController();


router.post("/gateway/exporter/consumer", async (ctx, next) =>
    await gatewayController.saveConsumer(ctx, next)
);

router.post("/gateway/analytics/person", async (ctx, next) =>
    await gatewayController.savePerson(ctx, next)
);

router.delete("/gateway/analytics/person/:email", async (ctx, next) =>
    await gatewayController.deletePerson(ctx, next)
);

router.post("/gateway/catalog/property", async (ctx, next) =>
    await gatewayController.saveProperty(ctx, next)
);

router.post("/gateway/catalog/sensor", async (ctx, next) =>
    await gatewayController.saveSensor(ctx, next)
);

router.post("/gateway/catalog/rank", async (ctx, next) =>
    await gatewayController.saveRank(ctx, next)
);

router.get("/gateway/catalog/property", async (ctx, next) =>
    await gatewayController.getAllProperties(ctx, next)
);

router.get("/gateway/catalog/sensor", async (ctx, next) =>
    await gatewayController.getAllSensors(ctx, next)
);

router.get("/gateway/catalog/rank", async (ctx, next) =>
    await gatewayController.getAllRanks(ctx, next)
);

router.get("/gateway/analytics/person/:email", async (ctx, next) =>
    await gatewayController.getPersonByEmail(ctx, next)
);

router.get("/gateway/exporter/consumers/:email", async (ctx, next) =>
    await gatewayController.getConsumer(ctx, next)
);

router.post("/gateway/observation", async (ctx, next) => {
    await gatewayController.saveObservation(ctx, next)
});

router.post("/gateway/observation/:esn", async (ctx, next) => {
    await gatewayController.saveObservation(ctx, next)    
});

router.get("/gateway/observations", async (ctx, next) =>
    await gatewayController.getAll(ctx, next)
);

router.get("/gateway/analytics/averages/:criterion", async (ctx, next) =>
   await gatewayController.calculateAverageValues(ctx, next)
);

router.post("/gateway/login", async (ctx, next) =>
  await gatewayController.login(ctx, next)
);

module.exports = router;
