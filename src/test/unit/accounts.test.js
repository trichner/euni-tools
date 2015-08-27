'use strict';

var expect = require('expect.js');
var sequelizeFixtures = require('sequelize-fixtures');
var Q = require('q');
var path = require("path");

var accountsService = require('../../services/accounts')

describe('models/accounts', function () {
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

    var expectedAccount = {
        id: "35361",
        apiKeyId: "1337"
    };

    describe('get account', function () {
        it('finds the account', function () {
            return accountsService.getAccountById(35361).should.become(expectedAccount);
        });
    });

});
