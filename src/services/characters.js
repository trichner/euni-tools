
var Q = require('q');
var models  = require('../models/index');
var sanitizer = require('sanitizer');

var crest = require('./crest');


module.exports = {
    getCharacterById : getCharacterById
};

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
    console.log(JSON.stringify(apiCharacter))
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
        securityStatus: "4.16920499697278" || apiCharacter.securityStatus.content // FIXME not in DB!
    }
}


