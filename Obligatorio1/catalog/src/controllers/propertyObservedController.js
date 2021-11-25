const PropertyObservedService = require('../services/propertyObservedService');
const RankService = require('../services/rankService');

module.exports = class SensorController {
    constructor() {
        this.propertyObservedService = new PropertyObservedService();
        this.rankService = new RankService();
    }

    async getAll(ctx, next) {
        let list = (await this.propertyObservedService.findAll()) || [];
        ctx.body = { data: list };
        await next();
    }

    async save(ctx, next) {
        let data = ctx.request.body;
        let property = await this.propertyObservedService.save(data);
        if (property) {
            ctx.body = { data: property };
        } else {
            ctx.status = 400;
            ctx.body = { status: 400, message: `Invalid property observed data` };
        }
        await next();
    }

    async findByName(ctx, next) {
        try {
            let name = ctx.params.name;
            let unit = ctx.params.unit;
            let property = await this.propertyObservedService.findByName(name, unit);
            let rank = await this.rankService.findByProperty(property)
            if (rank) {
                ctx.body = { data: rank.dataValues };
            } else {
                ctx.status = 404;
                ctx.body = { status: 404, message: `property observed #${name} not found` };
            }
            await next();
        }
        catch (error) {
            ctx.status = 404;
            ctx.body = { status: 404, message: `sensor not found` };
        }
    }
}