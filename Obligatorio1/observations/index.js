const Server = require("./server");
const ObservationRepository = require("./src/repositories/repository");

(async () => {
  try {
    await ObservationRepository.initRepository();
    await Server.initServer();
  } catch (err) {
    console.log(`Error initializing server: ${err}`);
    process.exit(1); 
  }
})();
