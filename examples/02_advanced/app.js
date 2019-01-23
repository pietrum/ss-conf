const conf = require('../../conf')();

// eslint-disable-next-line
console.log('--\napp.js %o\n--', conf);

// separate modules
require('./src/module1');
require('./src/module2');
require('./src/module3');
