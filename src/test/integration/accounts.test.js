'use strict';

var app     = require('../../routes/root')
var Q       = require('q');
var expect  = require('expect.js');
var request = require('supertest');
var path    = require("path");

var sequelizeFixtures = require('sequelize-fixtures');

describe('routes/accounts', function () {
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

    //=== Service Tests
    var expectedAccount = {
        id: "35361",
        apiKeyId: "1337"
    };

    it('loads correctly', function (done) {
      request(app).get('/api/accounts/35361.json')
          .expect('Content-Type', /json/)
          .expect(function (res) {
              expect(res.body).to.eql(expectedAccount);
          })
          .expect(200, done);
    });

    var expectedDNR = {
        "accountId" : String(35361),
        "characterId" : String(698922017),
        "actedBy" : String(698922015),
        "actedOn" : "2014-08-12T21:04:08.000Z",
        "type" : "DNR",
        "reason" : "Dirty spai."
    }

    it('loads dnr correctly', function (done) {
        request(app).get('/api/accounts/35361/dnr.json')
            .expect('Content-Type', /json/)
            .expect(function (res) {
                expect(res.body).to.eql(expectedDNR);
            })
            .expect(200, done);
    });
});
