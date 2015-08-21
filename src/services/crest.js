/**
 * Created by Thomas on 16.04.2015.
 *
 * http://wiki.eve-id.net/APIv2_Page_Index
 */
var neow = require('neow');
var Q    = require('q');
var unirest = require('unirest');

/*
 * Example XML Api response:
 {
 "characterID": {
 "content": "698922015"
 },
 "characterName": {
 "content": "Thomion"
 },
 "race": {
 "content": "Caldari"
 },
 "bloodlineID": {
 "content": "1"
 },
 "bloodline": {
 "content": "Deteis"
 },
 "ancestryID": {
 "content": "11"
 },
 "ancestry": {
 "content": "Scientists"
 },
 "corporationID": {
 "content": "917701062"
 },
 "corporation": {
 "content": "EVE University"
 },
 "corporationDate": {
 "content": "2015-04-17 23:15:00"
 },
 "allianceID": {
 "content": "937872513"
 },
 "alliance": {
 "content": "Ivy League"
 },
 "allianceDate": {
 "content": "2006-09-17 20:10:00"
 },
 "securityStatus": {
 "content": "4.43519929851504"
 },
 "employmentHistory": {
         "14017037": {
         "recordID": "14017037",
         "corporationID": "1000044",
         "corporationName": "School of Applied Knowledge",
         "startDate": "2010-06-11 18:41:00"
         },
         "16403311": {
         "recordID": "16403311",
         "corporationID": "579612888",
         "corporationName": "Deutscher Orden",
         "startDate": "2011-03-23 16:49:00"
         },
         "20137322": {
         "recordID": "20137322",
         "corporationID": "1000006",
         "corporationName": "Deep Core Mining Inc.",
         "startDate": "2012-07-01 12:58:00"
         },
         "33650911": {
         "recordID": "33650911",
         "corporationID": "917701062",
         "corporationName": "EVE University",
         "startDate": "2014-06-28 16:32:00"
         },
         "36757427": {
         "recordID": "36757427",
         "corporationID": "1000006",
         "corporationName": "Deep Core Mining Inc.",
         "startDate": "2015-01-17 21:45:00"
         },
         "37829882": {
         "recordID": "37829882",
         "corporationID": "917701062",
         "corporationName": "EVE University",
         "startDate": "2015-04-17 23:15:00"
         }
 },
 "currentTime": "2015-07-27 15:34:09",
 "cachedUntil": "2015-07-27 15:43:39"
 }
 */
var client = new neow.EveClient();

module.exports = {
    getCharacter : function(characterID){
        return client.fetch('eve:CharacterInfo',{characterID:characterID});
    },
    getCharacterSheet : function(characterID){
        return client.fetch('char:CharacterSheet',{characterID:characterID});
    },
    getCharacterId : getCharacterId,
    getCharacterFromAccessToken : getCharacterFromAccessToken
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

function getCharacterFromAccessToken(accessToken){
    return getCharacterId(accessToken)
        .then(api.getCharacter)
}