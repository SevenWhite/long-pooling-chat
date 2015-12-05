'use strict';

let router = require('koa-router')();
let parse = require('co-busboy');
let EventEmitter = require('events');
let events = new EventEmitter();
events.setMaxListeners(0);

let subscribers = [];

router
    .get('/subscribe', function* (next) {

        let promise = new Promise((resolve, reject) => {
            events.once('message', sendMessage);

            this.req.on('close', function() {
                events.removeListener('message', sendMessage);
                unsubscribe(promise);
            });

            function sendMessage(message){
                resolve(message);
            }
        });

        //console.log(`subscribers length`, subscribers.length);
        //console.log('events listeners', events.listenerCount('message'));

        subscribers.push(promise);

        this.req.on('end', function() {
            unsubscribe(promise);
        });

        let message = yield promise;
        return this.body = message;
    })
    .post('/publish', function* (next) {
        let parts = parse(this, {
            autoFields: true
        });
        let part;
        while (part = yield parts) {
            //
        }

        let message = parts.field.message;
        events.emit('message', message);
        return this.body = 'Your message successfully published';
    });

module.exports = router;

function unsubscribe(promise) {
    subscribers = subscribers.slice(subscribers.indexOf(promise), 1);
}