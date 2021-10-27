const Server = require('./server');
const ExporterRepository = require('../exporter/src/repositories/repository');
const AnalyticsRepository = require('../analytics/src/repositories/repository');
const CatalogRepository = require('../catalog/src/repositories/repository');

(async () => {
    try {
        await ExporterRepository.initRepository();
        await AnalyticsRepository.initRepository();
        await CatalogRepository.initRepository();
        await Server.initServer();
    } catch(err) {
        console.log(`Error initializing server: ${err}`);
        process.exit(1);
    }
})();