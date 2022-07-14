const express = require('express');

const tinker = express();

tinker.use(express.static(__dirname + '/tinker'));
tinker.use(express.static(__dirname + '/media'));

tinker.get('/', function(req, res) {
    res.sendFile(__dirname + '/tinker/index/index.html');
});

tinker.use('/applications', require('./applications/applications.js'));

tinker.use(function(req, res) {
    res.redirect('/');
});

tinker.listen(3000);