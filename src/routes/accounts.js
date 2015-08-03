
var service = require('./../services/service');
var router = require('express').Router();
var sanitizer = require('sanitizer');

var account = {
    id: 1234,
    apiKey: 1234,
    apiVCode: "43523452354",
    updatedAt: Date.now()
}

var accountDNR = {
    accountID: 1234,
    actedBy: 123453,
    type: "blulb",
    reason: "do not like him",
    standing: 0
}

router.get('/:id', function (req, res, next) {
    return res.json(character);
});

router.get('/:id/dnr.json', function (req, res, next) {
    return res.json(employmentHistory);
});

router.get('/:id/api-pulls.json', function (req, res, next) {
    return res.json(characterApiPulls);
});

router.get('/:id/notes.json', function (req, res, next) {
    return res.json(characterNotes);
});

router.get('/:id/logs.json', function (req, res, next) {
    return res.json(characterLogs);
});

router.get('/:id/details.json', function (req, res, next) {
    return res.json(characterDetails)
});

router.get('/:id/actions.json', function (req, res, next) {
    return res.json(characterActions)
});

router.post('/:id/notes.json', function (req, res, next) {
    var characterId = req.params.id;
    var actingId = req.session.characterId;
    var note = req.body.note;
    var type = req.body.type;
    // sanitize!
    note = sanitizer.sanitize(note);
    type = sanitizer.sanitize(type);
    console.log(note);
    return res.status(204).end();
});

router.post('/:id/logs.json', function (req, res, next) {
    var characterId = req.params.id;
    var actingId = req.session.characterId;
    var log = req.body.log;
    var type = req.body.type;
    // sanitize!
    log = sanitizer.sanitize(log);
    type = sanitizer.sanitize(type);
    console.log(log);
    return res.status(204).end();
});

module.exports = router;
