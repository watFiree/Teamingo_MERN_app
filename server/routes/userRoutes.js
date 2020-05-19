const express = require('express');
const userController = require('../controllers/userControler.js')

const userRouter = express.Router();


userRouter.route('/invite')
    .post(userController.inviteUser)
    .delete(userController.removeInvitation)

userRouter.route('/promote')
    .post(userController.promoteUser)
    
module.exports = userRouter;