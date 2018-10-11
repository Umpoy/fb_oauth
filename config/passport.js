const localStrategy = require('passport-local').Strategy;

const User = require('../app/models/user');

moduel.exports = passport => {

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
                User.findOne({ 'local.email': email }, (err, user) => {
                    if (err) {
                        return done(err);
                    }
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken'));
                    } else {
                        const newUser = new User();
                        newUser.local.email = email;
                        newUser.local.password = password;

                        newUser.save(err => {
                            if (err) {
                                throw err;
                            }
                            return done(null, newUser);git
                        })
                    }
                })
            })
        }
    ));
}