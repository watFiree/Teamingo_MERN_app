const express = require("express");
const teamContoller = require('../controllers/teamController')

const teamRouter = express.Router();

teamRouter.route('/')
    .get(teamContoller.findAll)
    .post(teamContoller.createTeam)
    .delete(teamContoller.deleteTeam)
    .put(teamContoller.editTeam)

module.exports = teamRouter;