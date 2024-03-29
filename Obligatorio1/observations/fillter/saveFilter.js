const ObservationService = require("../src/services/observationService");
var observarionService = new ObservationService();

const saveFilter = async (input, next) => {
  await observarionService.save(input)
    .catch(function (err) {
      throw new Error(err.message);
    })
}

module.exports = {
  saveFilter,
};

if (require.main === module) {
  console.log("I'm process ID", process.pid);
  saveFilter(process.argv[2], (err, result) => process.send(result));
}

