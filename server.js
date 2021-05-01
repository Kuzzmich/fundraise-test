const Koa = require('koa');
const serve = require('koa-static');
const mount = require('koa-mount');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const server = new Koa();
const ui = new Koa();
const router = require('./routes');

ui.use(serve('app'));
server.use(mount('/', ui));

server.use(json());
server.use(bodyParser());
server.use(router.routes());

server.listen(3003);

console.log('listening on port: 3003');
