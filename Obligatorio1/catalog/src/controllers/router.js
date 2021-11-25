const Router = require("koa-router");

const PropertyObservedController = require("./propertyObservedController");
const SensorController = require("./sensorController");
const RankController = require("./rankController");

const router = new Router();
const propertyObservedController = new PropertyObservedController();
const sensorController = new SensorController();
const rankController = new RankController();

router.post("/catalog/sensor", async (ctx,next) =>{
  await sensorController.save(ctx, next)}
);

router.post("/catalog/property", async (ctx,next) =>{
  await propertyObservedController.save(ctx, next)}
);

router.post("/catalog/rank", async (ctx, next) =>{
  await rankController.save(ctx, next)}
);

router.get("/catalog/sensor", async (ctx,next) =>{
  await sensorController.getAll(ctx, next)}
);

router.get("/catalog/property", async (ctx,next) =>{
  await propertyObservedController.getAll(ctx, next)}
);

router.get("/catalog/rank", async (ctx, next) =>{
  await rankController.getAll(ctx, next)}
);

router.get("/catalog/sensor/property/:esn/:name", async (ctx, next) =>{  
  await sensorController.sensorProperty(ctx, next)}
);

router.get("/catalog/rank/:name/:unit", async (ctx, next) =>{  
  await propertyObservedController.findByName(ctx, next)}
);

router.get("/catalog/sensor/:esn/:name", async (ctx, next) =>{  
  await sensorController.existSensorProperty(ctx, next)}
);



module.exports = router;