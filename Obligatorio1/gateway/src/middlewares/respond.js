const convert = require('xml-js');

module.exports = () => {
    return async (ctx, next) => {
        await next();
        switch (ctx.accepts('json')) {
            case 'json':
                renderJSON(ctx);
                break;
        }
    }
};

function renderJSON(ctx) {
    let body = ctx.body;
    ctx.response.type = 'json';
    ctx.body = JSON.stringify(body);
}

