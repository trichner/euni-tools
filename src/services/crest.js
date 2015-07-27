/**
 * Created by Thomas on 16.04.2015.
 */
var neow = require('neow');
var Q    = require('q');
var unirest = require('unirest');

/*
 * Example XML Api response:
     {
     name: 'Thomion',
     characterID: '698922015',
     corporationName: 'Deep Core Mining Inc.',
     corporationID: '1000006',
     allianceID: '0',
     allianceName: '',
     factionID: '0',
     factionName: ''
     }
 */
var client = new neow.EveClient();

module.exports = {
    getCharacter : function(characterID){
        return client.fetch('eve:CharacterInfo',{characterID:characterID});
    },
    getCharacterId : getCharacterId
}

function getCharacterId(accessToken){
    var deferred = Q.defer();
    unirest.get('https://login.eveonline.com/oauth/verify')
        .header('Accept', 'application/json')
        .header('Authorization', 'Bearer ' + accessToken)
        .end(function (res){
            //console.log('Verify Body' + JSON.stringify(res.body))
            deferred.resolve(res.body.CharacterID);
        });
    return deferred.promise;
}
