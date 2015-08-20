'use strict';

var expect = require('expect.js');

describe('models/characters', function () {
    beforeEach(function () {
        this.characters = require('../../models').characters;
        return this.characters.destroy({truncate: true})
    });

    describe('create', function () {
        it('creates a character', function () {
            return this.characters.create({
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
});
