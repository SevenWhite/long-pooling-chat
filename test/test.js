'use strict';

let request = require('co-request');
let mocha = require('co-mocha');
let should = require('should');
let app = require('../app');

function getUrl(url) {
    return `http://localhost:3000${url}`;
}


describe('Test long-pooling-chat', function() {

    before(function() {
        app.listen(3000);
    });

    it('Test publish', function* () {
        let res = yield request({
            method: 'post',
            url: getUrl('/publish'),
            formData: {message: 'message'}
        });
        res.statusCode.should.equal(200);
    });

    //todo this does not work
    it('Test subscribe', function* () {
        let res = yield {
            subscribe: request(getUrl('/subscribe')),
            publish: request({
                method: 'post',
                url: getUrl('/publish'),
                formData: {message: 'message'}
            })
        };
        res.subscribe.statusCode.should.equal(200);
    });



});