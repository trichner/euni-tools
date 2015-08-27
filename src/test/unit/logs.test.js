'use strict';

var expect = require('expect.js');
var sequelizeFixtures = require('sequelize-fixtures');
var Q = require('q');
var path = require("path");

var logService = require('../../services/logs')

describe('models/logs', function () {
    beforeEach(function () {
        this.models = require('../../models');
        var models = this.models;
        var promises = Object.keys(this.models).filter(function (model) {
            return ['Sequelize','sequelize'].indexOf(model)<0;
        }).map(function (model) {
            return models[model].destroy({truncate: true});
        });
        return Q.all(promises).then(function () {
            return sequelizeFixtures.loadFile(path.join(__dirname, "../fixtures/thomion.json"), models);
        })
    });


    var newLog = {
        "id": 0,
        "authorId": "698922016",
        "characterId" : "698922015",
        "createdAt" : null,
        "log" : "Some text",
        "description" : "Interview Hansueli",
        "type" : "Interview"
    }
    describe('create log', function () {
        it('creates a log', function () {
            return logService.createLog(newLog.authorId,newLog.characterId,newLog.description,newLog.type,newLog.log)
                .then(function (log) {
                    newLog.id = log.id;
                    newLog.createdAt = log.createdAt;
                    return log;
                })
                .should.become(newLog);
        });
    });

});
