const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name: String,
    owner : Object,
    admins: Array,
    color: String,
    notes: Array,
    users: Array
},{
    timestamps: true
});

module.exports = mongoose.model('Team', TeamSchema, 'teams');