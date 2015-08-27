
var accountService = require('./../services/accounts');
var router = require('express-promise-router')();
var sanitizer = require('sanitizer');

var accountDNR = {
    accountID: 1234,
    actedBy: 123453,
    type: "blulb",
    reason: "do not like him",
    standing: 0
}

router.get('/:id.json', function (req, res, next) {
    var accountId = req.params.id;
    return accountService.getAccountById(accountId)
        .then(res.json.bind(res))
});

router.get('/:id/dnr.json', function (req, res, next) {
    var accountId = req.params.id;
    return accountService.getAccountDNRById(accountId)
        .then(res.json.bind(res))
});

module.exports = router;
