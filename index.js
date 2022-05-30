const express = require('express');
const tinker = express();

tinker.use(express.static(__dirname + '/public'));

tinker.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

tinker.use(function(req, res) {
    res.redirect('/');
});

tinker.listen(8090);