const Publisher = require('../src/models/publisher');
const publisher = new Publisher();

const analyzeFilter = async (input, next) => {
  await publisher.publishSaveObservation(input)
  .catch(function (err) {
    throw new Error(err.message);
  })
}

module.exports = {
  analyzeFilter,
};

if (require.main === module) {
  console.log("I'm process ID", process.pid);
  analyzeFilter(process.argv[2], (err, result) => process.send(result));
}
