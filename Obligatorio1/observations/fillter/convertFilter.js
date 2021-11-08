const ObservationService = require("../src/services/observationService");
const Formula = require("./formulas");
const observarionService = new ObservationService();
const formula = new Formula();

const convertFilter = async (input, next) => {
  const unit = input.unit;
  const name = input.name;
  const esn = input.ESN;
  const property = await observarionService.sensorProperty(esn, name);
  input.standarizedUnit = property.unit;
  input.value = await formula.transform(input.value, unit, input.standarizedUnit);
}

module.exports = {
  convertFilter,
};

if (require.main === module) {
  console.log("I'm process ID", process.pid);
  convertFilter(process.argv[2], (err, result) => process.send(result));
}

