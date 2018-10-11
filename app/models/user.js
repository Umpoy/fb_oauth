const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userScheme = mongoose.Schema({
    local: {
        username: String,
        password: String
    }
});

userScheme.methods.generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(9));

userScheme.methods.validPassword = password => bcrypt.compareSync(password, this.local.password);

module.exports = mongoose.model('User', userScheme);