const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');

const configDB = require('./config/database.js');
mongoose.connect(configDB.url);
require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'string',
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set('view engine', 'ejs');

// app.use('/', (req, res) => {
//     res.send('Hello World');
//     console.log('req.cookies: ', req.cookies);
//     console.log('=================');
//     console.log('req.session: ', req.session);
// });

require('./app/routes')(app, passport);

app.listen(port, () => {
    console.log('Listening on port ' + port);
})