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
        await team.updateOne({$push: {admin:{nickname, id}}})
        res.status(200).status({user:{nickname, id}, teamId})
    }
}