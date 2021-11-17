const AbstractServer = require('./abstractServer')

class httpServer extends AbstractServer {
    constructor() {
        super();
    }

    async initServer() {
        const router = require('./src/controllers/router');
        const respond = require('./src/middlewares/respond');
        const argv = require('minimist')(process.argv.slice(2));
        const Koa = require('koa');
        const bodyParser = require("koa-bodyparser");
        const app = new Koa();
        const port = argv.port ? parseInt(argv.port) : 8080;

        app.use(bodyParser());
        app.use(router.routes());
        app.use(router.allowedMethods());
        app.use(respond())

        app.listen(port);


        console.log(`Server started, see http://localhost:${port}`);
    }
}

module.exports = httpServer;