const CatalogService = require('../../../catalog/src/services/catalogService');
const ExporterService = require('../../../exporter/src/services/exporterService');

module.exports = class GatewayService {
    constructor() {
        this.exporterService = new ExporterService();
    }
}