const express = require('express'),
    router = express.Router();
const session = require('express-session');
const passport = require('passport');
var SQLiteStore = require('connect-sqlite3')(session);
var crypto = require('crypto');
var db = require('../db');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const KEYS = require('../config/keys.json');
//keeping our secrets out of our main application is a security best practice
//we can add /config/keys.json to our .gitignore file so that we keep it local/private
var LocalStrategy = require('passport-local');

let userProfile; //only used if you want to see user info beyond username

router.use(session({
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 600000 //600 seconds of login time before being logged out
    },
    secret: KEYS["session-secret"],
    store: new SQLiteStore({ db: 'sessions.db', dir: './db' })
}));
router.use(passport.authenticate('session'));
router.use(passport.initialize());
router.use(passport.session());

console.log(KEYS)

passport.use(new GoogleStrategy({
        clientID: KEYS["google-client_id"],
        clientSecret: KEYS["google-client_secret"],
        callbackURL: "http://localhost:3000/auth/google/callback"
            //todo: port==process.env.PORT? :
    },
    function(accessToken, refreshToken, profile, done) {
        userProfile = profile; //so we can see & use details form the profile
        return done(null, userProfile);
    }
));

passport.use(new LocalStrategy(function verify(username, password, cb) {
    db.get('SELECT * FROM users WHERE username = ?', [username], function(err, row) {
        if (err) { return cb(err); }
        if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }

        crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
            if (err) { return cb(err); }
            if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
                return cb(null, false, { message: 'Incorrect username or password.' });
            }
            return cb(null, row);
        });
    });
}));


passport.serializeUser(function(user, cb) {
    cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

/*
  This triggers the communication with Google
*/
router.get('/auth/google',
    passport.authenticate('google', {
        scope: ['email']
    }));

/*
  This callback is invoked after Google decides on the login results
*/
router.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/error?code=401'
    }),
    function(request, response) {
        console.log(userProfile);
        response.redirect('/');
    });

router.get('/guestlogin', function(req, res, next) {
    res.render('guestlogin');
});

router.post('/guestlogin/password', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/guestlogin'
}));


router.get("/logout", (request, response) => {
    request.session.destroy()

    response.redirect('/');
});

module.exports = router;