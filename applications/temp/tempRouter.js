const expess = require('express');
const temp = expess.Router();

temp.use(expess.static(__dirname + '/static'));

module.exports = temp;