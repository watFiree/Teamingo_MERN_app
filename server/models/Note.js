const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    author: {type: String , required: true},
    coverImg: {type: String},
    title: {type: String , required: true},
    teamName: {type: String , required: true},
    teamColor: {type: String},
    content: {type: String , required: true}
},{
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema, 'items');