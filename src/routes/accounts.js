
var accountService = require('./../services/accounts');
var router = require('express-promise-router')();
var sanitizer = require('sanitizer');

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
