const Team = require('../models/Team');
const User = require('../models/User');
const Note = require('../models/Note');
const bcrypt = require('bcryptjs')

module.exports = {
    async getData(req,res){
        const {id} = req.query;
        const user = await User.findById(id);
        if(!user) return res.status(404).send({message: "User not found"});
        return res.status(200).send({notes: user.notes, teams: user.teams, invitations: user.invitations});

    },
    async inviteUser(req,res){
        const {nickname, teamName, teamId} = req.body;
        const user = await User.findOne({nickname});
        if(!user) return res.sendStatus(404);
        await user.updateOne({$push: {invitations: {teamId, teamName}}})
        res.sendStatus(200);
    },
    async removeInvitation(req,res){
        const {userId, teamId} = req.body;
        const user = await User.findOne({_id: userId});
        if(!user) return res.sendStatus(404);
        await user.updateOne({$pull: {invitations: {teamId}}});
        res.status(200).send({teamId});
    },
    async promoteUser(req,res){
        const {nickname,id,teamId} = req.body;
        const team = await Team.findOne({_id: teamId});
        if(!team) return res.sendStatus(404);
        await team.updateOne({$push: {creators:{nickname, id}}})
        res.status(200).send({user:{nickname, id}, teamId})
    },
    async degradeUser(req,res){
        const {nickname,id,teamId} = req.body;
        const team = await Team.findOne({_id: teamId});
        if(!team) return res.sendStatus(404);
        await team.updateOne({$pull: {creators:{nickname, id}}});
        res.status(200).send({userId: id, teamId})
    },
    async editNickname(req,res){
        const {last, updated, type} = req.body;
        const exists = await User.findOne({nickname: updated});
        if(exists) return res.status(400).send({message: "This nickname already exists", type})
        const user = await User.findOne({nickname: last});
        if(!user) return res.status(404).send({message: "User not found", type})
        const teamsIds = await user.teams;
        const notesIds = await user.notes;
        await user.updateOne({nickname: updated});
        await Note.updateMany({author: last}, {author: updated});
        if(teamsIds){
            await Team.updateMany({_id: teamsIds, "admin.nickname": last}, {$set:{"admin.nickname": updated}})
            await Team.updateMany({_id: teamsIds}, {$pull:{users: {nickname: last}}})
            await Team.updateMany({_id: teamsIds}, {$push:{users: {nickname: updated, id: user._id.toString()}}});
            const creatorIn = await Team.find({_id: teamsIds, "creators.nickname": last}).then(res=> res.map(team => team._id.toString()));
            if(creatorIn){
                await Team.updateMany({_id: creatorIn},{$pull:{creators: {nickname: last}}})
                await Team.updateMany({_id: creatorIn},{$push:{creators:{nickname: updated, id: user._id.toString()}}})
            }
        }
        return res.status(200).send({last, updated, teamsIds, notesIds})
    },    
    async editEmail(req,res){
        const {id, last, updated,type} = req.body;
        const user = await User.findById(id);
        if(!user) return res.status(404).send({message: "User not found", type})
        if(last !== user.email) return res.status(400).send({message: "Emails don't match !", type})
        await user.updateOne({email: updated});
        return res.status(200).send({email:updated})
    },
    async editPassword(req,res){
        const {id, last, updated, type} = req.body;
        const user =  await User.findById(id);
        if(!user) return res.status(404).send({message: "User not found", type})
        const comparePasswords = await bcrypt.compare(
            last,
            user.password
        );
        if(!comparePasswords) return res.status(400).send({message: "Passwords don't match", type})
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(updated, salt);
        await user.updateOne({$set:{password}});
        res.sendStatus(200);
    },
    async deleteUser(req,res){
        const {id} = req.body;
        const user = await User.findById(id);
        if(!user) return res.status(404).send({message: "User not found"})
        const teamsIds = await user.teams;
        await Team.updateMany({_id: teamsIds}, {$pull: {users:{id}, creators:{id}}});
        await User.findByIdAndDelete(id);
        return res.sendStatus(200);
    }
}