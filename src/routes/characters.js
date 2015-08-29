var characterService = require('./../services/characters');
var logService = require('./../services/logs');
var noteService = require('./../services/notes');
var router = require('express-promise-router')();
var sanitizer = require('sanitizer');

var employmentHistory = [
    {
        startDate: "2010-06-11 18:41:00",
        corporation: {
            id: "1000044",
            name: "School of Applied Knowledge"
        }
    },
    {
        corporation: {
            id: "1000006",
            name: "Deep Core Mining Inc."
        },
        startDate: "2010-09-17 21:45:00"
    },
    {
        corporation: {
            id: "579612888",
            name: "Deutscher Orden"
        },
        startDate: "2011-03-23 16:49:00"
    },
    {
        corporation: {
            id: "1000006",
            name: "Deep Core Mining Inc."
        },
        startDate: "2012-07-01 12:58:00"
    },
    {
        corporation: {
            id: "917701062",
            name: "EVE University"
        },
        startDate: "2014-06-28 16:32:00"
    },
    {
        corporation: {
            id: "1000006",
            name: "Deep Core Mining Inc."
        },
        startDate: "2015-01-17 21:45:00"
    },
    {
        corporation: {
            id: "917701062",
            name: "EVE University"
        },
        startDate: "2015-04-17 23:15:00"
    }
]

var characterApiPulls = [
    {
        pulledBy: "91541581",
        characterID: "698922015",
        pulledAt: new Date('1.1.2015')
    },
    {
        pulledBy: "698922015",
        characterID: "698922015",
        pulledAt: new Date('1.2.2015')
    }
];

var characterActions = [
    {
        createdAt: new Date("1.4.2014"),
        action: "Accepted",
        actor: {
            id: "91541581",
            name: "Laura Karpinski"
        }
    },
    {
        createdAt: new Date("3.2.2014"),
        action: "Rejected",
        actor: {
            id: "91541581",
            name: "Laura Karpinski"
        }
    }
];

var standings = {
    agents: [
        {
            id: 3009841,
            name: "Pausent Ansin",
            standing: 0.35
        },
        {
            id: 3009846,
            name: "Charie Octienne",
            standing: 0.1
        }
    ],
    corporations: [
        {
            id: 1000061,
            name: "Freedom Extension",
            standing: 0.42
        },
        {
            id: 1000094,
            name: "TransStellar Shipping",
            standing: 0.02
        },
        {
            id: 1000064,
            name: "Carthum Conglomerate",
            standing: 2.3
        }
    ],
    factions: [
        {
            id: 500003,
            name: "Amarr Empire",
            standing: 1.1
        },
        {
            id: 500020,
            name: "Serpentis",
            standing: -3.2
        }
    ]
}

router.get('/me.json', function (req, res, next) {
    var actingId = req.session.actingId;
    return characterService.getCharacterById(actingId)
        .then(res.json.bind(res))
});

router.get('/:id.json', function (req, res, next) {
    var characterId = req.params.id;
    return characterService.getCharacterById(characterId)
        .then(res.json.bind(res))
});

router.get('/:id/employment-history.json', function (req, res, next) {
    return res.json(employmentHistory);
});

router.get('/:id/api-pulls.json', function (req, res, next) {
    return res.json(characterApiPulls);
});

router.get('/:id/notes.json', function (req, res, next) {
    var characterId = req.params.id;
    return noteService.getNotesByCharacterId(characterId)
        .then(res.json.bind(res))
});

router.get('/:id/logs.json', function (req, res, next) {
    var characterId = req.params.id;
    return logService.getLogsByCharacterId(characterId)
        .then(res.json.bind(res))
});

router.get('/:id/details.json', function (req, res, next) {
    var characterId = req.params.id;
    return characterService.getCharacterDetailsById(characterId)
        .then(res.json.bind(res))
});

router.get('/:id/actions.json', function (req, res, next) {
    return res.json(characterActions)
});

router.get('/:id/standings.json', function (req, res, next) {
    return res.json(standings)
});

router.get('/:id/account.json', function (req, res, next) {
    var characterId = req.params.id;
    return characterService.getAccountByCharacterId(characterId)
        .then(res.json.bind(res))
});

router.get('/:id/titles.json', function (req, res, next) {
    return res.json({error: "NOT IMPLEMENTED"})
});

router.get('/:id/linked.json', function (req, res, next) {
    var characterId = req.params.id;
    return characterService.getLinkedCharactersByCharacterId(characterId)
        .then(res.json.bind(res))
});

router.post('/:id/notes.json', function (req, res, next) {
    var characterId = req.params.id;
    var actingId = req.session.characterId;
    // sanitize!
    var note = sanitizer.sanitize(req.body.note);
    var type = sanitizer.sanitize(req.body.type);
    return noteService.createNote(actingId, characterId, type, note)
        .then(res.json.bind(res))
});

router.post('/:id/logs.json', function (req, res, next) {
    var characterId = req.params.id;
    var actingId = req.session.characterId;

    // sanitize!
    var log = sanitizer.sanitize(req.body.log);
    var type = sanitizer.sanitize(req.body.type);
    var description = sanitizer.sanitize(req.body.description);
    return logService.createLog(actingId, characterId, description, type, log)
        .then(res.json.bind(res))
});

module.exports = router;
