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
        const team = await Team.findOne({_id: req.body.teamId});
        if(!team) return res.sendStatus(404);
        const notesIds = await team.notes;
        await Note.deleteMany({_id: notesIds});
        const usersIds = await team.users.map(user => user.id);
        await User.updateMany({_id: usersIds}, {$pull : {notes: {$in:notesIds}}})
        await Team.deleteOne({_id: req.body.teamId});
        await User.updateMany({_id: usersIds}, {$pull : {teams: req.body.teamId}});
        res.status(200).send({id:req.body.teamId});
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
    },
    async addUser(req,res){
        const {userId, teamId} = req.body;
        const user = await User.findOne({_id: userId});
        const team = await Team.findOne({_id: teamId});
        if(!user) return res.sendStatus(404);
        if(!team) return res.sendStatus(404);
        await user.updateOne({$pull: {invitations: {teamId}}})
        await user.updateOne({$push: {teams: teamId.toString()}});
        await user.updateOne({$push: {notes: team.notes}});
        await team.updateOne({$push: {users: {nickname: user.nickname, id: userId}}})
        const updatedTeam = await Team.findOne({_id: teamId});
        res.status(200).send(updatedTeam);
    },
    async removeUser(req,res){
        const {id, teamId} = req.body;
        const user = await User.findOne({_id: id});
        const team = await Team.findOne({_id: teamId});
        if(!user) return res.sendStatus(404);
        if(!team) return res.sendStatus(404);
        const notesIds = await team.notes;
        await user.updateOne({$pull: {teams: teamId}});
        await user.updateOne({$pull: {notes: {$in:notesIds}}})
        await team.updateOne({$pull: {users: {id}}});
        res.status(200).send({userId: id, teamId, notesIds})
    }
}