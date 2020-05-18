const Team = require('../models/Team');
const User = require('../models/User');

module.exports = {
    async inviteUser(req,res){
        const {nickname, teamName, teamId} = req.body;
        const user = await User.findOne({nickname});
        if(!user) return res.sendStatus(404);
        await user.updateOne({$push: {invitations: {teamId, teamName}}})
        res.sendStatus(200);
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
    }
}