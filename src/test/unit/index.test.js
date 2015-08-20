'use strict';

var expect = require('expect.js');

var modelsToTest = ['characters','accounts','dnr','apiPulls','apiPulls_skills','apiPulls_titles',
  'joinAppActions','joinAppDetails','joinApps','joinQueue','linkedAccounts','linkedCharacters','logs','notes',
  'permissions','standingEntities','standingPulls','standings','titleAppActions','titleApps','titleQueue','titles'];

describe('models/index', function () {

  modelsToTest.forEach(function (model) {
    it('returns the ' + model + ' model', function () {
      var models = require('../../models');
      expect(models[model]).to.be.ok();
    });
  })

});
