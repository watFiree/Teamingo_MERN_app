const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name: String,
    admin : Object,
    creators: Array,
    color: String,
    notes: Array,
    users: Array
},{
    timestamps: true
});

module.exports = mongoose.model('Team', TeamSchema, 'teams');