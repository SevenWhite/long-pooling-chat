'use strict';

let app = require('koa')();
let serve = require('koa-static');
let ChatRouter = require('./controllers/ChatController');

app.use(serve(`${__dirname}/public`));
app.use(ChatRouter.routes());

module.exports = app;