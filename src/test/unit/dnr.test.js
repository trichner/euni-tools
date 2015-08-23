'use strict';

var expect = require('expect.js');
var sequelizeFixtures = require('sequelize-fixtures');
var Q = require('q');
var path = require("path");

var charactersService = require('../../services/characters')

var accountsService = require('../../services/accounts')

describe('models/dnr', function () {
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

    //=== Model Tests
    describe('create', function () {
        it('creates a dnr', function () {
            return accountsService.setAccountDNRById("35362","698922016","698922015","SPAI","Is a spaai!!").should.eventually.resolve;
        });
    });

    var expectedDNR = {
        "accountId" : String(35361),
        "characterId" : String(698922017),
        "actedBy" : String(698922015),
        "actedOn" : new Date("2014-08-12 23:04:08"),
        "type" : "DNR",
        "reason" : "Dirty spai."
    }

    describe('find', function () {
        it('findes a dnr', function () {
            return accountsService.getAccountDNRById("35361").should.become(expectedDNR);
        });
    });
});
