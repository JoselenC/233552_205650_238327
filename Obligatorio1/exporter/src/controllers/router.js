const Router = require("koa-router");

const ExporterController = require("./exporterController");

const router = new Router();
const exporterController = new ExporterController();

router.post("/exporter/consumer", async (ctx, next) =>{
  await exporterController.save(ctx, next)}
);

router.get("/exporter/consumer/:email", async (ctx, next) =>{
  await exporterController.getData(ctx, next)}
);

router.get("/exporter/consumers/:email", async (ctx, next) =>{
  await exporterController.getConsumersByEmail(ctx, next)}
);

module.exports = router;