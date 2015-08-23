
var Q = require('q');
var models  = require('../models/index');
var sanitizer = require('sanitizer');

var crest = require('./crest');


module.exports = {
    getAccountById : getAccountById
};

function getAccountById(accountId){
    return models.accounts.find({where: {id: accountId}})
        .then(mapAccount)
}

var account = {
    id: 1234,
    apiKey: 1234,
    apiVCode: "43523452354",
    updatedAt: Date.now()
}

function mapAccount(account){
    return {
        id: String(account.id),
        apiKeyId: String(account.apiKeyId)
    }
}


