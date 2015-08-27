
var Q = require('q');
var models  = require('../models/index');
var sanitizer = require('sanitizer');

module.exports = {
    getNoteById : getNoteById,
    getNotesByAuthorId : getNotesByAuthorId,
    getNotesByCharacterId : getNotesByCharacterId
};

function getNoteById(noteId){
    return models.notes.findOne({where: {id: noteId}})
        .then(mapNote)
}

function getNotesByAuthorId(authorId){
    return models.notes.findAll({where: {authorId: authorId}})
        .then(mapNotes)
}

function getNotesByCharacterId(characterId){
    return models.notes.findAll({where: {characterId: characterId}})
        .then(mapNotes)
}

function mapNotes(notes){
    return notes.map(mapNote)
}

function mapNote(note){
    return {
        id: String(note.id),
        authorId: String(note.authorId),
        characterId: String(note.characterId),
        createdAt: note.postedOn,
        note: note.note,
        type: note.type
    }
}

