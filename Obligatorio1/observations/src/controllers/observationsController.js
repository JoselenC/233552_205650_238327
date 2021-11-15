const ObservationService = require("../services/observationService");
const Pipeline = require('../../pipeline/pipeline');
const pipeline = new Pipeline();

var convertFilter = async (input, next) => {
  await require('../../fillter/convertFilter').convertFilter(input, next);
  next(null, input);
};

var analyzeFilter = async (input, next) => {
  await require('../../fillter/analyzeFilter').analyzeFilter(input, next);
  next(null, input);
};

var saveFilter = async (input, next) => {
  await require('../../fillter/saveFilter').saveFilter(input, next);
  next(null, input);
};

module.exports = class GatewayController {
  constructor() {
    this.observationService = new ObservationService();
  }

  async saveObservation(ctx, next) {

    try {
      let esn = ""
      if (ctx.params.esn != "")
        esn = ctx.params.esn
      else if (ctx.request.header.esn != "")
        esn = ctx.request.header.esn;
      else if (esn == null)
        throw new Error("Invalid empty esn");
      let data = ctx.request.body;
      data.ESN = esn;
      data.registrationDate = Date.now();
      pipeline.use(convertFilter);  
      pipeline.use(analyzeFilter);  
      pipeline.use(saveFilter);  
      pipeline.run(data)
      return await new Promise((resolve, reject) => {
        pipeline.on('end', (result) => {           
          resolve(result)        
        })
        pipeline.on('error', (err) => {
          console.log(`The error is ${err}`);
        });
      })
    } catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
      next()
    }
  }

  async getAll(ctx, next) {
    let list = (await this.observationService.findAll()) || [];
    ctx.body = { data: list };
    next();
  }
}