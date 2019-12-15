let mongoose = require('mongoose');
const database = require('../../config/connectDb');

let userSchema = new mongoose.Schema(
    {
        email: {type: String, unique: true},
        name: {type: String, required: true},
        password: {type: String, required: true},
        token: {type: String},
    }
);

module.exports = mongoose.model('User', userSchema);