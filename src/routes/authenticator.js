
var passport = require('passport')
var OAuth2Strategy = require('passport-oauth2').Strategy;
var session = require('express-session');
var eveSSO = require('./../services/eve-sso');
var ssoCredentials = require(__dirname + '/../config/evesso.json');

var env       = process.env.NODE_ENV || "production";
var config    = require(__dirname + '/../config/config.json')[env];

var callbackURL = config.eveSsoCallback || "http://localhost:3000/euni-tools/api/auth/callback";

var router = require('express').Router();

//--- Passport Eve SSO Oauth setup
passport.serializeUser(function(pilot, done) {
    done(null, pilot);
});

passport.deserializeUser(function(pilotId, done) {
    done(null,pilotId);
});

passport.use(new OAuth2Strategy({
        authorizationURL: 'https://login.eveonline.com/oauth/authorize',
        tokenURL: 'https://login.eveonline.com/oauth/token',
        clientID: ssoCredentials.clientID,
        clientSecret: ssoCredentials.clientSecret,
        callbackURL: callbackURL,
        passReqToCallback: true
    },
    function(req,accessToken, refreshToken, profile, done) {
        eveSSO.getCharacterIdFromAccessToken(accessToken)
            .then(function (characterId) {
                req.session.actingId = characterId;
                req.session.verified = true;
                req.session.cookie.maxAge = 3600000*24*365; // a year
                done(null, characterId);
            }, function (err) {
                done(err, null);
            })
    }
));

router.use(passport.initialize());
router.use(passport.session());

//--- Login
router.post('/auth', passport.authenticate('oauth2',{
    state : "HelloWorld" //TODO
}));

//--- Oauth Callback (needs to be subdir of Login URL)
router.get('/auth/callback',
    passport.authenticate('oauth2',{
        successRedirect : '/euni-tools/account-details.html', //TODO
        failureRedirect : '/euni-tools/account-details.html'
    }));


//--- Logout
router.delete('/auth', function(req, res, next) {
    req.session.destroy(function(err){
        if(err){
            var err = new Error('Cannot logout')
            err.status = 500;
            next(err);
        }else{
            res.status(200).end();
        }
    })
});

//--- Bouncer
router.use(function(req, res, next) {
    if(req.isAuthenticated()){
        next();
    }else{
        var err = new Error('Please authenticate.')
        err.status = 401;
        return next(err);
    }
})


module.exports = router;
