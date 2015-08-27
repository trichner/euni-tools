'use strict';

var app = require('../../routes/root')
var Q = require('q');
var expect = require('expect.js');
var request = require('supertest');
var path      = require("path");

var sequelizeFixtures = require('sequelize-fixtures');

describe('characters linked routes', function () {
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

});
