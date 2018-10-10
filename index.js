const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const morgan = require('morgan');

app.use(morgan('dev'));

app.use('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log('Listening on port ' + port);
})