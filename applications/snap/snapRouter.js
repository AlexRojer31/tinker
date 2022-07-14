const expess = require('express');
const snap = expess.Router();

snap.use(expess.static(__dirname + '/static'));
snap.use(expess.static(__dirname + '/media'));

module.exports = snap;