const expess = require('express');
const Router = expess.Router();

Router.use('/temp', require('./temp/tempRouter.js'));
// Router.use('/snap', require('./snap/snapRouter.js'));

module.exports = Router;