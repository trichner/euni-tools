'use strict';

var expect = require('expect.js');
var sequelizeFixtures = require('sequelize-fixtures');
var Q = require('q');
var path = require("path");

describe('models/linkedCharacters', function () {
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

    it('finds linked characters', function (done) {
        return this.models.characters.find({where: {id: 698922015}}).then(function (character) {
            expect(character).to.be.ok();
            return character.getLinkedCharacters();
        })
            .then(function (linkedCharacters) {
                console.log(JSON.stringify(linkedCharacters))
                var linkedCharactersIds = linkedCharacters.map(function (char) {
                    return char.id;
                })
                expect(linkedCharactersIds).to.eql([698922016]);
                done();
            })
    });

    it('links characters', function (done) {
        return this.models.characters.find({where: {id: 698922015}}).then(function (character) {
            expect(character).to.be.ok();
            return character.addLinkedCharacter(698922017)
                .then(function () {
                    return character.getLinkedCharacters();
                })
        })
            .then(function (linkedCharacters) {
                var linkedCharactersIds = linkedCharacters.map(function (char) {
                    return char.id;
                });
                expect(linkedCharactersIds).to.eql([698922016,698922017]);
                done();
            })
    });
});