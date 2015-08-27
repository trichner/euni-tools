
var accountService = require('./../services/accounts');
var router = require('express').Router();
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
        .then(function (account) {
            res.json(account);
        })
        .catch(function (e) {
            next(e);
        })
});

router.get('/:id/dnr.json', function (req, res, next) {
    return res.json(accountDNR);
});

module.exports = router;
