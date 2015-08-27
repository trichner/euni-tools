
var Q = require('q');
var models  = require('../models/index');
var sanitizer = require('sanitizer');

module.exports = {
    getLogById : getLogById,
    getLogsByAuthorId : getLogsByAuthorId,
    getLogsByCharacterId : getLogsByCharacterId,
    createLog : createLog
};

function createLog(authorId,characterId,description,type,log){
    return models.logs.create({
        authorId: authorId,
        characterId: characterId,
        description: description,
        type: type,
        log: log,
        createdAt: Date.now()
    }).then(mapLog)
}

function getLogById(logId){
    return models.logs.findOne({where: {id: logId}})
        .then(mapLog)
}

function getLogsByAuthorId(authorId){
    return models.logs.findAll({where: {authorId: authorId}})
        .then(mapLogs)
}

function getLogsByCharacterId(characterId){
    return models.logs.findAll({where: {characterId: characterId}})
        .then(mapLogs)
}

function mapLogs(logs){
    return logs.map(mapLog)
}

function mapLog(log){
    return {
        id: String(log.id),
        authorId: String(log.authorId),
        characterId: String(log.characterId),
        createdAt: log.createdAt,
        log: log.log,
        description: log.description,
        type: log.type
    }
}

