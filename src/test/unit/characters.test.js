'use strict';

var expect = require('expect.js');
var sequelizeFixtures = require('sequelize-fixtures');
var Q = require('q');
var path = require("path");

var charactersService = require('../../services/characters')

describe('models/characters', function () {
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
        it('creates a character', function () {
            return this.models.characters.create({
                name: 'johndoe sting',
                id: 42,
                forumId: 1,
                accountId: 2,
                primaryChar: 0,
                firstPull: Date.now(),
                latestPull: Date.now(),
                charSheetCache: Date.now()
            }).bind(this).then(function (characters) {
                expect(characters.name).to.equal('johndoe sting');
            });
        });
    });

    //=== Service Tests
    var expectedCharacter = {
        id: "698922015",
        name: "Thomion",
        corporation: {
            id: "917701062",
            name: "EVE University"
        },
        alliance: {
            id: "937872513",
            name: "Ivy League"
        }
    };

    describe('get character', function () {
        it('finds a character', function () {
            return charactersService.getCharacterById(698922015).should.become(expectedCharacter);
        });
    });

    var expectedAccount = {
        id: "35361",
        apiKeyId: "1337"
    };

    describe('get account', function () {
        it('finds the account', function () {
            return charactersService.getAccountByCharacterId(698922015).should.become(expectedAccount);
        });
    });
});
