var service = require('./../services/service');
var parser = require('./parser')
var authenticator = require('./authenticator');
var characters = require('./characters')
var Q = require('q');

var app = require('express')();

app.use('/',parser);
//app.use(authenticator);


app.get('/accounts', function(req, res, next) {
    var pilotId = req.session.pilotId;

});

app.get('/accounts/:id.json', function(req, res, next) {
    var accountId = req.params.id;

});

/* GET create new waitlist*/
app.post('/accounts', function(req, res, next) {
    var pilotId = req.session.pilotId;

});

app.use('/characters',characters);


module.exports = app;
