var config = require('config');

function deferBinding() {
    let serverType = config.get('server.type');
    let implementation;
    implementation = require(`../../${serverType}Server`);
    return implementation;
}

module.exports = deferBinding();