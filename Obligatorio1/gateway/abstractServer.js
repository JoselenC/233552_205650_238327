const EventEmitter = require('events'),
    Util = require('util');

class AbstractServer {
    constructor() {
    }
    use(filter) {
        this.filters.push(filter);
        return this;
    }
    run(input) {
        throw new Error('Not implemented');
    }
}

module.exports = AbstractServer;