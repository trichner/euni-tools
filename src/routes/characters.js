
var service = require('./../services/service');
var router = require('express').Router();

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
    dateOfBirth: "2010-06-11 18:41:00"
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
        description: "Interview Log by Laura",
        type: "Interview"
    },
    {
        converserID: "91541580",
        converseeID: "698922015",
        createdAt: new Date("3.1.2014"),
        log: "THis is another log, could be veeeeery long",
        description: "Interview Log by Dunar",
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
]

var linkedAccounts = [

]

var characterActions = [
    {
        createdAt: new Date("1.1.2014"),
        action: "Accepted",
        actedBy: "698922015"
    }
]


router.get('/:id', function (req, res, next) {
    return res.json(character);
});

router.get('/:id/employment-history', function (req, res, next) {
    return res.json(employmentHistory);
});

router.get('/:id/api-pulls', function (req, res, next) {
    return res.json(characterApiPulls);
});

router.get('/:id/notes', function (req, res, next) {
    return res.json(characterNotes);
});

router.get('/:id/logs', function (req, res, next) {
    return res.json(characterLogs);
});

router.get('/:id/details', function (req, res, next) {
    return res.json(characterDetails)
});

router.get('/:id/actions', function (req, res, next) {
    return res.json(characterActions)
});

module.exports = router;
