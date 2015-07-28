
var service = require('./../services/service');
var router = require('express').Router();
var sanitizer = require('sanitizer');

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

var characterDetails = {
    skillpoints: 31000000,
    walletBalance: 333000000,
    dateOfBirth: "2010-06-11 18:41:00",
    logonMinutes: 60*555,
    logonCount: 212
}

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

var characterLogs = [
    {
        converserID: "91541581",
        converseeID: "698922015",
        createdAt: new Date("11.1.2014"),
        log: "THis is the actual log, could be very long",
        description: "Log by Laura",
        type: "Interview"
    },
    {
        converserID: "91541580",
        converseeID: "698922015",
        createdAt: new Date("3.1.2014"),
        log: "THis is another log, could be veeeeery long",
        description: "Log by Dunar",
        type: "Titles"
    }
]

var characterNotes = [
    {
        authorID: "91541581",
        characterID: "698922015",
        createdAt: new Date("11.1.2014"),
        note: "THis is the actual note, could be very long",
        type: "Interview"
    },
    {
        authorID: "91541580",
        characterID: "698922015",
        createdAt: new Date("1.1.2014"),
        note: "THis is another note, could be veeeeery long",
        type: "Titles"
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

var linkedAccounts = [

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


router.get('/:id', function (req, res, next) {
    return res.json(character);
});

router.get('/:id/employment-history.json', function (req, res, next) {
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
