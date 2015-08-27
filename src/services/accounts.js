
var Q = require('q');
var models  = require('../models/index');
var sanitizer = require('sanitizer');

var crest = require('./crest');


module.exports = {
    getAccountById : getAccountById,
    getAccountDNRById : getAccountDNRById,
    setAccountDNRById : setAccountDNRById
};

function getAccountById(accountId){
    return models.accounts.find({where: {id: accountId}})
        .then(mapAccount)
}

function getAccountDNRById(accountId){
    return models.accounts.find({where: {id: accountId}})
        .then(function (account) {
            return account.getDoNotRecruit()
        })
        .then(mapDoNotRecruit)
}

function setAccountDNRById(accountId,characterId,actedBy,type,reason){
    return models.accounts.find({where: {id: accountId}})
        .then(function (account) {
            return account.setDoNotRecruit(characterId,actedBy,type,reason);
        })
}

function mapAccount(account){
    return {
        id: String(account.id),
        apiKeyId: String(account.apiKeyId)
    }
}

function mapDoNotRecruit(dnr){
    return {
        accountId: String(dnr.accountId),
        characterId: String(dnr.characterId),
        actedBy: String(dnr.actedBy),
        actedOn: dnr.actedOn,
        type: dnr.type,
        reason: dnr.reason
    }
}

