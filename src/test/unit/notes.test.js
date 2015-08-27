'use strict';

var expect = require('expect.js');
var sequelizeFixtures = require('sequelize-fixtures');
var Q = require('q');
var path = require("path");

var noteService = require('../../services/notes')

describe('models/notes', function () {
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


    var newNote = {
        "id": 0,
        "authorId": "698922016",
        "characterId" : "698922015",
        "createdAt" : null,
        "note" : "Some text",
        "type" : "HR Note"
    }
    describe('create note', function () {
        it('creates a note', function () {
            return noteService.createNote(newNote.authorId,newNote.characterId,newNote.type,newNote.note)
                .then(function (note) {
                    newNote.id = note.id;
                    newNote.createdAt = note.createdAt;
                    return note;
                })
                .should.become(newNote);
        });
    });

});
