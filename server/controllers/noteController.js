const Note = require('../models/Note');
const Team = require('../models/Team');
const User = require('../models/User');

module.exports = {
    async findAll(req,res){
        const note = await Note.find({_id: req.query.ids});
        if(!note) return res.sendStatus(404);
        return res.status(200).send(note) 
    },
    async createNote(req,res){
        const note = await new Note(req.body);
        const team  = await Team.findOne({name: note.teamName});
        if(!team) return res.sendStatus(400);
        await note.save();
        await User.updateMany({teams: team._id.toString()}, {$push: {notes: note._id.toString()}});
        await team.updateOne({notes: [...team.notes, note._id.toString()]});

        return res.status(200).send(note)
    },
    async deleteNote(req,res){
        const note = await Note.findOne({_id: req.body.id})
        if(!note) return res.sendStatus(404);
        const team = await Team.findOne({name: req.body.teamName});
        if(!team) return res.sendStatus(404);
        const usersIds = await team.users;
        await Note.deleteOne({_id: req.body.id});
        await team.updateOne({$pull : {notes: req.body.id.toString()}});
        await User.updateMany({_id: usersIds}, {$pull : {notes: req.body.id}});
        res.sendStatus(200);
    }
}