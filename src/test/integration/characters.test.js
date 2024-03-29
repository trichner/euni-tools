'use strict';

var app     = require('../../routes');
var Q       = require('q');
var expect  = require('expect.js');
var request = require('supertest');
var path    = require("path");

var sequelizeFixtures = require('sequelize-fixtures');

describe('routes/characters', function () {
    beforeEach(function () {
        this.models = require('../../models');
        var models = this.models;
        var promises = Object.keys(this.models).filter(function (model) {
            return ['Sequelize','sequelize'].indexOf(model)<0;
        }).map(function (model) {
            return models[model].destroy({truncate: true});
        });
        return Q.all(promises).then(function () {
            return sequelizeFixtures.loadFile(path.join(__dirname,"../fixtures/thomion.json"), models);
        })
    });

    var charIdThomion = 698922015;
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

    it('loads correctly', function (done) {
      request(app).get('/api/characters/' + charIdThomion + '.json')
          .expect('Content-Type', /json/)
          .expect(function (res) {
              expect(res.body).to.eql(expectedCharacter);
          })
          .expect(200, done);
    });


    var expectedAccount = {
        id: "35361",
        apiKeyId: "1337"
    };

    it('loads accounts correctly', function (done) {
        request(app).get('/api/characters/' + charIdThomion + '/account.json')
            .expect('Content-Type', /json/)
            .expect(function (res) {
                expect(res.body).to.eql(expectedAccount);
            })
            .expect(200, done);
    });

    var expectedLogs = [{"id":"1","authorId":"698922016","characterId":"698922015",
        "createdAt":"2015-08-12T21:04:08.000Z", "log":"This could be veeery long :)",
        "description":"Interview Thomion","type":"Interview"}];

    it('loads logs correctly', function (done) {
        request(app).get('/api/characters/' + charIdThomion + '/logs.json')
            .expect('Content-Type', /json/)
            .expect(function (res) {
                expect(res.body).to.eql(expectedLogs);
            })
            .expect(200, done);
    });

    var expectedNotes = [{"id":"1","authorId":"698922016","characterId":"698922015",
        "createdAt":"2015-08-11T21:04:08.000Z","note":"I like :)","type":"Note"}];
    it('loads notes correctly', function (done) {
        request(app).get('/api/characters/' + charIdThomion + '/notes.json')
            .expect('Content-Type', /json/)
            .expect(function (res) {
                expect(res.body).to.eql(expectedNotes);
            })
            .expect(200, done);
    });

    var expectedLinks = [{"id":"698922016","name":"Nib Athmi"}];
    it('loads linked characters correctly', function (done) {
        request(app).get('/api/characters/' + charIdThomion + '/linked.json')
            .expect('Content-Type', /json/)
            .expect(function (res) {
                expect(res.body).to.eql(expectedLinks);
            })
            .expect(200, done);
    });


    // TODO: this is not the complete implementation, e.g. logonMinutes is missing
    var expectedDetails = {"characterId":698922015,"skillpoints":32000000,"walletBalance":50000000,
        "dateOfBirth":"2012-08-12T21:04:08.000Z","logonMinutes":0,"logonCount":0,"securityStatus":0}

    it('loads details correctly', function (done) {
        request(app).get('/api/characters/' + charIdThomion + '/details.json')
            .expect('Content-Type', /json/)
            .expect(function (res) {
                expect(res.body).to.eql(expectedDetails);
            })
            .expect(200, done);
    });
});
