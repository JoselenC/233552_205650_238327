const Router = require("koa-router");

const ExporterController = require("../../../exporter/src/controllers/exporterController");
const AnalyticsController = require("../../../analytics/src/controllers/analyticsController");
const PropertyObservedController = require("../../../catalog/src/controllers/propertyObservedController");
const SensorController = require("../../../catalog/src/controllers/sensorController");
const RankController = require("../../../catalog/src/controllers/rankController");
const ObservationsController = require("../../../observations/src/controllers/observationsController");

const router = new Router();
const exporterController = new ExporterController();
const analyticsController = new AnalyticsController();
const propertyObservedController = new PropertyObservedController();
const sensorController = new SensorController();
const observationsController = new ObservationsController();
const rankController = new RankController();

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

router.post("/gateway/person", (ctx, next) =>
    analyticsController.saveAnalytics(ctx, next)
);


router.get("/gateway/observation", (ctx, next) =>
    observationsController.getAll(ctx, next)
);

router.get("/gateway/property", (ctx, next) =>
    propertyObservedController.getAll(ctx, next)
);

router.get("/gateway/analytics/averages/:startDate/:endDate/:observedPropertyName/:observedPropertyUnit/:sensor", (ctx, next) =>
    analyticsController.calculateAverageValues(ctx, next)
);

router.post("/gateway/property", (ctx, next) =>
    observationsController.save(ctx, next)
);




router.post("/gateway/sensor", (ctx, next) =>
    sensorController.save(ctx, next)
);

router.post("/gateway/rank", (ctx, next) =>
    rankController.save(ctx, next)
);

router.get("/gateway/sensor", (ctx, next) =>
    sensorController.getAll(ctx, next)
);

router.post("/gateway/observation", async (ctx, next) => {
    await observationsController.saveObservation(ctx, next)
        .then((value) => {
            ctx.body = { data: value }
        }).catch(function () {
            console.log("Promise Rejected");
       })
});

router.post("/gateway/observation/:esn", async (ctx, next) => {
    await observationsController.saveObservation(ctx, next)
        .then((value) => {
            ctx.body = { data: value }
        }).catch(function () {
            console.log("Promise Rejected");
       })
       
});

module.exports = router;
