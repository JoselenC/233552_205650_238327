const RankService = require('../services/rankService');

module.exports = class SensorController {
    constructor() {
        this.rankService = new RankService();
    }


    async save (ctx, next) {
        let data = ctx.request.body;
        let rank = await this.rankService.save(data);
        if (rank) {
            ctx.body = rank;
        } else {
            ctx.status = 400;
            ctx.body = { status: 400, message: `Invalid rank data` };
        }
        await next();
    }

}