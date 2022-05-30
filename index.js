const express = require('express');
const tinker = express();

tinker.get('/', function(req, res) {
    res.send('hello tinker');
});

tinker.use(function(req, res) {
    res.redirect('/');
});

tinker.listen(8090);