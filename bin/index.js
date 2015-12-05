'use strict';

let config = require('config');
let app = require('../app');

app.listen(config.get('app.port'));