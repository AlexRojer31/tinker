const expess = require('express');
const Router = expess.Router();
const saper = require('./saper/saperRouter.js')

Router.use('/saper', saper);

module.exports = Router;