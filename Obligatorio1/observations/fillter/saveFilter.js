const ObservationService = require("../src/services/observationService");
var observarionService = new ObservationService();

const saveFilter = async (input, next) => {
  input.value=0
  console.log(input)
  await observarionService.save(input);
}

module.exports = {
  saveFilter,
};

if (require.main === module) {
  console.log("I'm process ID", process.pid);
  saveFilter(process.argv[2], (err, result) => process.send(result));
}

