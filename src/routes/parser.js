
var session = require('express-session');
var eveHeader = require('eve-header');
var FileStore = require('session-file-store')(session);
var minions = require('./../minions/minions');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

module.exports = [
        cookieParser(),
        bodyParser.json(),
        bodyParser.urlencoded({ extended: false, type: 'application/x-www-form-urlencoded' }),
        eveHeader,
        session({
            secret: minions.getSessionSecret(),
            store: new FileStore(),
            name: 'euni-tools.sid',
            proxy: true,
            resave: true,
            rolling: true,
            saveUninitialized: true
        })
    ];