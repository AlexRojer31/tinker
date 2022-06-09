const express = require('express');

const tinker = express();

tinker.use(express.static(__dirname + '/index'));
tinker.use(express.static(__dirname + '/components'));
tinker.use(express.static(__dirname + '/media'));

tinker.get('/', function(req, res) {
    res.sendFile(__dirname + '/index/index.html');
});

tinker.use('/applications', require('./applications/applications.js'));

tinker.use(function(req, res) {
    res.redirect('/');
});

tinker.listen(8090);