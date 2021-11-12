const ObservationService = require("../src/services/observationService");
const Formula = require("./formulas");
const observarionService = new ObservationService();
const formula = new Formula();

const convertFilter = async (input, next) => {
  try {
    const unit = input.unit;
    const name = input.name;
    const esn = input.ESN;
    const property = await observarionService.sensorProperty(esn, name);
    input.standarizedUnit = property.unit;
    input.standarizedData= await formula.transform(input.value,property.unit,input.unit)
  } catch (err) {
    throw new Error(err.message)
  }
}

module.exports = {
  convertFilter,
};

if (require.main === module) {
  console.log("I'm process ID", process.pid);
  convertFilter(process.argv[2], (err, result) => process.send(result));
}

