const ObservationService = require("../services/observationService");
const Pipeline = require('../../pipeline/pipeline');
const pipeline = new Pipeline();
const log = require("../../../logger/log");


var convertFilter = async (input, next) => {
  await require('../../fillter/convertFilter').convertFilter(input, next)
    .catch(function (err) {
      log.error(
        `${err.message} ocurred on controller observation in filter covertFilter`
      );
      next(err);
    })
  next(null, input);
};

var analyzeFilter = async (input, next) => {
  await require('../../fillter/analyzeFilter').analyzeFilter(input, next)
    .catch(function (err) {
      log.error(
        `${err.message} ocurred on controller observation in filter analyzeFilter`
      );
      next(err);
    })
  next(null, input);
};

var saveFilter = async (input, next) => {
  await require('../../fillter/saveFilter').saveFilter(input, next)
    .catch(function (err) {
      log.error(
        `${err.message} ocurred on controller observation in filter saveFilter`
      );
      next(err);
    })
  next(null, input);
};

module.exports = class GatewayController {
  constructor() {
    this.observationService = new ObservationService();
  }

  async saveObservation(ctx, next) {
    let init = Date.now();
    let esn = ""
    if (ctx.params.esn != "")
      esn = ctx.params.esn
    else if (ctx.request.header.esn != "")
      esn = ctx.request.header.esn;
    else if (esn == null)
      throw new Error("Invalid empty esn");
    let data = ctx.request.body;
    data.ESN = esn;
    data.path = "sensor.esn=" + data.ESN + ".property.name=" + data.name
    data.registrationDate = init;
    return await new Promise((resolve, reject) => {
      pipeline.use(convertFilter);
      pipeline.use(analyzeFilter);
      pipeline.use(saveFilter);
      pipeline.run(data)
      pipeline.on('end', (result) => {
        resolve(result)
      })
      pipeline.on('error', (err) => {
        reject(err)
      });
    })

  }

  async getAll(ctx, next) {
    let list = (await this.observationService.findAll()) || [];
    ctx.body = { data: list };
    next();
  }

  async findAllByConsumer(consumer) {
    return await this.observationService.findAllByConsumer(consumer) || [];
  }

  async findPropertiesByDateAndSensor(ctx, next) {
    try {
      let list = (await this.observationService.findPropertiesByDateAndSensor(ctx, next)) || [];
      ctx.body = { data: list };
      next();
    }
    catch (err) {
      ctx.status = 400;
      ctx.body = { status: 400, message: err.message };
    }
  }
}