
var Q = require('q');
var models  = require('../models/index');
var sanitizer = require('sanitizer');

var crest = require('./crest');
var accountsService = require('./accounts')


module.exports = {
    getCharacterById : getCharacterById,
    getAccountByCharacterId : getAccountByCharacterId
};

var account = {
    id: 1234,
    apiKey: 1234,
    apiVCode: "43523452354",
    updatedAt: Date.now()
}
function getAccountByCharacterId(characterId){
    return models.characters.find({where: {id: characterId}})
        .then(function (character) {
            return accountsService.getAccountById(character.accountId);
        })
}

var character = {
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
    securityStatus: "4.43519929851504"
}
function getCharacterById(characterId){
    var promises = [];
    promises.push(models.characters.find({where: {id: characterId}}));
    promises.push(models.apiPulls.findOne({where: {characterId: characterId},order: [['pullDate','DESC']]}));
    promises.push(crest.getCharacter(characterId));

    return Q.all(promises).spread(mapCharacter)
}

function mapCharacter(character, apiPull,apiCharacter){
    apiPull = apiPull || {};
    return {
        id: String(character.id),
        name: character.name,
        corporation: {
            id: String(apiPull.corporationId || 0),
            name: apiPull.corporationName || ''
        },
        alliance: {
            id: String(apiPull.allianceId || 0),
            name: apiPull.allianceName || ''
        },
        securityStatus: "0" // apiCharacter.securityStatus.content // FIXME not in DB!
    }
}


