const Server = require("./server");
const CatalogRepository = require("./src/repositories/repository");

(async () => {
  try {
    await CatalogRepository.initRepository();
    await Server.initServer();
  } catch (err) {
    console.log(`Error initializing server: ${err}`);
    process.exit(1); 
  }
})();
