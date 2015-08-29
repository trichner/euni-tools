'use strict';

var expect = require('expect.js');
var Q = require('q');
var crest = require('../../services/crest');

describe('services/crest', function () {

    describe('get character', function () {
        it('fetched a public character', function () {
            return  crest.getCharacter('91541581')
                .then(function (char) {
                    console.log('Laura:\n' + JSON.stringify(char, null, '\t'));
                    return char.characterName.content;
                }).should.become("Laura Karpinski")
        });
    });

});






