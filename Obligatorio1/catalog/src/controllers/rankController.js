const RankService = require('../services/rankService');

module.exports = class SensorController {
    constructor() {
        this.rankService = new RankService();
    }

    async getAll(ctx, next) {
        let list = (await this.rankService.findAll()) || [];
        ctx.body = { data: list };
        await next();
    }

    async save (ctx, next) {
        let data = ctx.request.body;
        let rank = await this.rankService.save(data);
        if (rank) {
            ctx.body = rank;
        } else {
            ctx.status = 500;
            ctx.body = { status: 500, message: `Invalid rank data` };
        }
        await next();
    }



}