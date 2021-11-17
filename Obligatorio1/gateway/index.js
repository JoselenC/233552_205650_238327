const server = require('./src/services/deferBinding');
const Server = new server();
const ExporterRepository = require('../exporter/src/repositories/repository');
const AnalyticsRepository = require('../analytics/src/repositories/repository');
const CatalogRepository = require('../catalog/src/repositories/repository');
const ObservationRepository = require('../observations/src/repositories/repository');
const Subscriber = require("../analytics/src/models/subscriber");

(async () => {
    try {
        await ExporterRepository.initRepository();
        await AnalyticsRepository.initRepository();
        await CatalogRepository.initRepository();
        await ObservationRepository.initRepository();
        this.subscriber = new Subscriber();
        this.subscriber.initSubscriber();
        await Server.initServer();
    } catch(err) {
        console.log(`Error initializing server: ${err}`);
        process.exit(1);
    }
})();