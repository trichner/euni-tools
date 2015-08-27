
var Q = require('q');
var models  = require('../models/index');
var sanitizer = require('sanitizer');

var accountsService = require('./accounts')


module.exports = {
    getCharacterById : getCharacterById,
    getAccountByCharacterId : getAccountByCharacterId,
    getLinkedCharactersByCharacterId : getLinkedCharactersByCharacterId,
    getCharacterDetailsById : getCharacterDetailsById
};

function getLinkedCharactersByCharacterId(characterId){
    return models.characters.find({where: {id: characterId}})
        .then(function (character) {
            return character.getLinkedCharacters();
        })
        .then(function (characters) {
            return characters.map(mapLinkedCharacter)
        })
}

function getAccountByCharacterId(characterId){
    return models.characters.findOne({where: {id: characterId}})
        .then(function (character) {
            return accountsService.getAccountById(character.accountId);
        })
}

function getCharacterById(characterId){
    var promises = [];
    promises.push(models.characters.find({where: {id: characterId}}));
    promises.push(models.apiPulls.findOne({where: {characterId: characterId},order: [['pullDate','DESC']]}));

    return Q.all(promises).spread(mapCharacter)
}

function getCharacterDetailsById(characterId){
    var promises = [];
    promises.push(models.characters.find({where: {id: characterId}}));
    promises.push(models.apiPulls.findOne({where: {characterId: characterId},order: [['pullDate','DESC']]}));

    return Q.all(promises).spread(mapCharacterDetails)
}

function mapCharacterDetails(character, apiPull){
    apiPull = apiPull || {};
    return {
        characterId: character.id,
        skillpoints: apiPull.totalSP || 0,
        walletBalance: apiPull.balance || 0,
        dateOfBirth: apiPull.DoB,
        logonMinutes: 0,    // TODO
        logonCount: 0,      // TODO
        securityStatus: 0   // TODO
    }

}

function mapCharacter(character, apiPull){
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
        }
    }
}

function mapLinkedCharacter(character){
    return {
        id: String(character.id),
        name: character.name
    }
}


