const Router = require("koa-router");

const ExporterController = require("../../../exporter/src/controllers/exporterController");
const AnalyticsController = require("../../../analytics/src/controllers/analyticsController");
const PropertyObservedController = require("../../../catalog/src/controllers/propertyObservedController");
const SensorController = require("../../../catalog/src/controllers/sensorController");

const router = new Router();
const exporterController = new ExporterController();
const analyticsController = new AnalyticsController();
const propertyObservedController = new PropertyObservedController();
const sensorController = new SensorController();

router.post("/gateway/consumer", (ctx, next) =>
    exporterController.saveConsumer(ctx, next)
);

router.get("/gateway/consumer/:name", (ctx, next) =>
    exporterController.getConsumersByName(ctx, next)
);

router.get("/gateway/data", (ctx, next) =>
    exporterController.getData()
);

router.get("/gateway/analytics/:email", (ctx, next) =>
    analyticsController.getPersonByEmail(ctx, next)
);

router.get("/gateway/property", (ctx, next) =>
    propertyObservedController.getAll(ctx, next)
);

router.post("/gateway/analytics", (ctx, next) =>
    analyticsController.saveAnalytics(ctx, next)
);

router.post("/gateway/property", (ctx, next) =>
    propertyObservedController.save(ctx, next)
);

router.post("/gateway/sensor", (ctx, next) =>
    sensorController.save(ctx, next)
);

router.get("/gateway/sensor", (ctx, next) =>
    sensorController.getAll(ctx, next)
);

module.exports = router;
