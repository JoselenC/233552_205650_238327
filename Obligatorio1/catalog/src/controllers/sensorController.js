const CatalogService = require('../services/sensorService');

module.exports = class SensorController {
    constructor() {
        this.catalogService = new CatalogService();
    }

    async findAll (ctx, next) {
        let list = (await this.catalogService.findAll()) || [];
        ctx.body = { data: list };
        await next();
    }

    async save (ctx, next) {
        let data = ctx.request.body;
        let sensor = await this.catalogService.save(data);
        if (sensor) {
            ctx.body = sensor;
        } else {
            ctx.status = 400;
            ctx.body = { status: 400, message: `Invalid sensor data` };
        }
        await next();
    }

    async findByName (ctx, next) {
        let name = ctx.params.name;
        let sensor = await this.catalogService.findByName(name);
        if (sensor) {
            ctx.body = {data: sensor };;
        } else {
            ctx.status = 404;
            ctx.body = { status: 404, message: `sensor #${name} not found` };
        }
        await next();
    }
}