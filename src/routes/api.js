var service = require('./../services/service');
var parser = require('./parser')
var authenticator = require('./authenticator');

var characters = require('./characters')
var accounts = require('./accounts')
var Q = require('q');

var app = require('express')();

app.use('/',parser);
//app.use(authenticator);


app.use('/accounts',accounts);
app.use('/characters',characters);


module.exports = app;
