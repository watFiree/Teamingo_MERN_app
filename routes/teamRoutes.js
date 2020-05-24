const express = require("express");
const teamController = require('../controllers/teamController')

const teamRouter = express.Router();

teamRouter.route('/')
    .get(teamController.findAll)
    .post(teamController.createTeam)
    .delete(teamController.deleteTeam)
    .put(teamController.editTeam)

teamRouter.route('/user')
    .post(teamController.addUser)
    .delete(teamController.removeUser)

module.exports = teamRouter;