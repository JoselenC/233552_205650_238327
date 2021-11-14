var config = require('config');

function deferBinding() {
    let type = config.get('pipeline.pipe');
    let implementation;
    implementation = require(`./${type}-pipeline`);
    return implementation;
}

module.exports = deferBinding();