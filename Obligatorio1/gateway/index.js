const server = require('./src/services/deferBinding');
const Server = new server();


(async () => {
    try {
        await Server.initServer();
    } catch(err) {
        console.log(`Error initializing server: ${err}`);
        process.exit(1);
    }
})();