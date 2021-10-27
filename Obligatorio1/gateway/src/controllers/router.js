const Router = require("koa-router");

const ExporterController = require("../../../exporter/src/controllers/exporterController");
const AnalyticsController = require("../../../analytics/src/controllers/analyticsController");
const PropertyObservedController = require("../../../catalog/src/controllers/propertyObservedController");

const router = new Router();
const exporterController = new ExporterController();
const analyticsController = new AnalyticsController();
const propertyObservedController = new PropertyObservedController();

router.post("/gateway/consumer", (ctx, next) =>
    exporterController.saveConsumer(ctx, next)
);

router.get("/gateway/consumer/:name", (ctx, next) =>
    exporterController.getConsumersByName(ctx, next)
);

router.get("/gateway/analytics/:email", (ctx, next) =>
    analyticsController.getPersonByEmail(ctx, next)
);

router.get("/gateway/property/:name", (ctx, next) =>
    propertyObservedController.findAll(ctx, next)
);

router.post("/gateway/analytics", (ctx, next) =>
    analyticsController.saveAnalytics(ctx, next)
);

router.post("/gateway/property", (ctx, next) =>
    propertyObservedController.save(ctx, next)
);

module.exports = router;
