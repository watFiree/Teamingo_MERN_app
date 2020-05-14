const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nickname: { type: String , required: true},
    email: { type: String },
    password: {type: String, required:true},
    notes: Array,
    teams: Array
},{
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema, 'users');