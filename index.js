const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({
    secret: 'string',
    saveUninitialized: true,
    resave: true
}));

app.use('/', (req, res) => {
    res.send('Hello World');
    console.log('req.cookies: ', req.cookies);
    console.log('=================');
    console.log('req.session: ', req.session);
});

app.listen(port, () => {
    console.log('Listening on port ' + port);
})