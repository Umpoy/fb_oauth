const localStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

const User = require('../app/models/user');
const configAuth = require('./fbauth');

module.exports = passport => {

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    passport.use('local-signup', new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        (req, email, password, done) => {
            process.nextTick(() => {
                User.findOne({ 'local.username': email }, (err, user) => {
                    if (err) {
                        return done(err);
                    }
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken'));
                    } else {
                        const newUser = new User();
                        newUser.local.username = email;
                        newUser.local.password = newUser.generateHash(password);

                        newUser.save(err => {
                            if (err) {
                                throw err;
                            }
                            return done(null, newUser);
                        })
                    }
                })
            })
        }
    ));

    passport.use('local-login', new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        (req, email, password, done) => {
            process.nextTick(() => {
                User.findOne({ 'local.username': email }, (err, user) => {
                    if (err)
                        return done(err);
                    if (!user)
                        return done(null, false, req.flash('loginMessage', 'No User found'));
                    if (!user.validPassword(password)) {
                        return done(null, false, req.flash('loginMessage', 'invalid password'));
                    }
                    return done(null, user);
                });
            });
        }
    ));

    passport.use(new FacebookStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        profileFields: ['emails', 'name']
    },
        (accessToken, refreshToken, profile, done) => {
            process.nextTick(() => {
                User.findOne({ 'facebook.id': profile.id }, (err, user) => {
                    if (err) {
                        return done(err);
                    }
                    if (user) {
                        return done(null, user);
                    } else {
                        const newUser = new User();
                        newUser.facebook.id = profile.id;
                        newUser.facebook.token = accessToken;
                        newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                        newUser.facebook.email = profile.emails[0].value;

                        newUser.save(err => {
                            if (err) {
                                throw err;
                            }
                            return done(null, newUser);
                        })
                    }
                });
            });
        }
    ));
}