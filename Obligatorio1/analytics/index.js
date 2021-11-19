const Server = require("./server");
const Repository = require("./src/repositories/repository");
const Subscriber = require("./src/models/subscriber")
const suscriber = new Subscriber();

(async () => {
  try {
    suscriber.initSubscriber();
    await Repository.initRepository();
    await Server.initServer();
  } catch (err) {
    console.log(`Error initializing server: ${err}`);
    process.exit(1);
  }
})();
