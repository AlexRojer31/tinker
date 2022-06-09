const expess = require('express');
const saper = expess.Router();

saper.use(expess.static(__dirname + '/media'));
saper.use(expess.static(__dirname + '/static'));

module.exports = saper;