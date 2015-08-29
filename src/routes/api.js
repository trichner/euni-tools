var Q = require('q');

var parser = require('./parser')
var authenticator = require('./authenticator');

var characters = require('./characters')
var accounts = require('./accounts')


var env       = process.env.NODE_ENV || "development";
var config    = require(__dirname + '/../config/config.json')[env];

var app = require('express')();

app.use('/',parser);

if(env != "test"){
    app.use(authenticator);
}

app.use('/accounts',accounts);
app.use('/characters',characters);


module.exports = app;
