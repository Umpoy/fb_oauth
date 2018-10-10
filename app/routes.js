const User = require('./models/user');

module.exports = app => {
    app.get('/', (req, res) => {
        res.send('Hello World');
    });

    app.get('/:username/:password', (req, res) => {
        const newUser = new User();
        newUser.local.username = req.params.username;
        newUser.local.password = req.params.password;
        console.log('newUser.local.name: ' + newUser.local.username);
        console.log('newUser.local.password: ' + newUser.local.password);
        newUser.save(err => {
            if (err) {
                throw err;
            }
        });
        res.send("Success!");
    })
}