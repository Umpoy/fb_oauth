const User = require('./models/user');
module.exports = (app, passport) => {
    app.get('/', (req, res) => {
        res.render('index.ejs');
    });

    app.get('/signup', (req, res) => {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    app.get('/:username/:password', (req, res) => {
        const newUser = new User();
        newUser.local.username = req.params.username;
        newUser.local.password = req.params.password;
        console.log(newUser.local.username + " " + newUser.local.password);
        newUser.save(err => {
            if (err)
                throw err;
        });
        res.send("Success!");
    })
}