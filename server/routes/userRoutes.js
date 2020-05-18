const express = require('express');
const userController = require('../controllers/userControler.js')

const userRouter = express.Router();

userRouter.route('/invite')
    .post(userController.inviteUser)

userRouter.route('/add')
    .post(userController.addUser)
    
module.exports = userRouter;