const Team = require('../models/Team');
const User = require('../models/User');
const Note = require('../models/Note');

module.exports = {
    async findAll(req,res){
        const team = await Team.find({_id: req.query.ids});
        if(!team) return res.sendStatus(404);
        return res.status(200).send(team) 
    },
    async createTeam(req,res){
        const data = {
            ...req.body,
            notes:[],
        };
        const team = await new Team(data);
        const admin = await User.findOne({_id: req.body.admin.id});
        if(!admin) return res.status(400);
        await admin.updateOne({$push: {teams: team._id.toString()}})
        await team.save();
        return res.status(200).send(team);

    },
    async deleteTeam(req,res){
        console.log(req.body);
        const team = await Team.findOne({_id: req.body.id});
        if(!team) return res.sendStatus(404);
        const notesIds = await team.notes;
        await Note.deleteMany({_id: notesIds});
        const usersIds = await team.users;
        await User.updateMany({_id: usersIds}, {$pull : {notes: {$in:notesIds}}})
        await Team.deleteOne({_id: req.body.id});
        await User.updateMany({_id: usersIds}, {$pull : {teams: req.body.id}});
        res.sendStatus(200);
    },
    async editTeam(req,res){
        const {name, color} = req.body;
        const team = await Team.findOne({_id: req.body.id});
        if(!team) return res.sendStatus(404);
        const notesIds = await team.notes;
        await team.updateOne({name, color});
        await Note.updateMany({_id: notesIds}, {teamName: name, teamColor: color});
        const updated = await Team.findOne({_id: req.body.id});
        res.status(200).send(updated);
    }
}