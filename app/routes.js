
module.exports = app => {
    app.get('/', (req, res) => {
        res.send('Hello World');
    });

    app.get('/:username/:password', (req, res) => {
        req.params.username
        req.params.password
    })
}