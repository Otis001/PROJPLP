//model.js
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    meterNumber: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
});

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;
