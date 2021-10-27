const convert = require('xml-js');

module.exports = () => { return async (ctx, next) => {
    await next();
    renderJSON(ctx);
}};

function renderJSON(ctx) {
    let body = ctx.body;
    ctx.response.type = 'json';
    ctx.body = JSON.stringify(body);
}
