'use strict';

var app     = require('../../routes/root')
var Q       = require('q');
var expect  = require('expect.js');
var request = require('supertest');
var path    = require("path");

var sequelizeFixtures = require('sequelize-fixtures');

describe('characters routes', function () {
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
        },
        securityStatus: "0"
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
});
