const CatalogService = require('../services/sensorService');

module.exports = class SensorController {
    constructor() {
        this.catalogService = new CatalogService();
    }

    async getAll(ctx, next) {
        let list = (await this.catalogService.findAll()) || [];
        ctx.body = { data: list };
        await next();
    }

    async save(ctx, next) {
        try {
            let data = ctx.request.body;
            let sensor = await this.catalogService.save(data);
            ctx.body = { data: sensor };
        }
        catch (err) {
            ctx.status = 500;
            ctx.body = { status: 500, message: `Invalid sensor data` };
        }
        await next();
    }

    async sensorProperty(ctx, next) {
        try {
            let esn = ctx.params.esn;
            let propertyName = ctx.params.name;
            let sensor = await this.catalogService.sensorProperty(esn, propertyName);
            if (sensor) {
                ctx.body = { data: sensor };
            } else {
                ctx.status = 404;
                ctx.body = { status: 404, message: `sensor not found` };
            }
            await next();
        }
        catch (error) {
            ctx.status = 404;
            ctx.body = { status: 404, message: `sensor not found` };
        }
    }

    async existSensorProperty(ctx, next) {
        try {
            let esn = ctx.params.esn;
            let propertyName = ctx.params.name;
            let sensor = await this.catalogService.sensorProperty(esn, propertyName) != null;
            if (sensor) {
                ctx.body = { data: sensor };
            } else {
                ctx.status = 404;
                ctx.body = { status: 404, message: `sensor not found` };
            }
            await next();
        }
        catch (err) {
            ctx.status = 404;
            ctx.body = { status: 404, message: `sensor #${name} not found` };
        }
    }

    async findByName(ctx, next) {
        try {
            let name = ctx.params.name;
            let sensor = await this.catalogService.findByName(name);
            if (sensor) {
                ctx.body = { data: sensor };;
            } else {
                ctx.status = 404;
                ctx.body = { status: 404, message: `sensor not found` };
            }
            await next();
        }
        catch (error) {
            ctx.status = 404;
            ctx.body = { status: 404, message: `sensor not found` };
        }
    }
}