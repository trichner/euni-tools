'use strict';

var app     = require('../../routes/root')
var Q       = require('q');
var expect  = require('expect.js');
var request = require('supertest');
var path    = require("path");

var sequelizeFixtures = require('sequelize-fixtures');

describe('accounts routes', function () {
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


    //it('lists a user if there is one', function (done) {
    //    this.models.characters.find({where: {characterID: 698922015}}).then(function (character) {
    //        request(app).get('/').expect(/johndoe/, done);
    //    })
    //});

    //it('lists the tickets for the user if available', function (done) {
    //    this.models.User.create({username: 'johndoe'}).bind(this).then(function (user) {
    //        return this.models.Task.create({title: 'johndoe task', UserId: user.id});
    //    }).then(function () {
    //        request(app).get('/').expect(/johndoe task/, done);
    //    });
    //});
});
