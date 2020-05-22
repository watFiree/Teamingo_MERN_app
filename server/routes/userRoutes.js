const express = require('express');
const userController = require('../controllers/userControler.js')

const userRouter = express.Router();

userRouter.route('/')
    .get(userController.getData)
    .delete(userController.deleteUser)

userRouter.route('/invite')
    .post(userController.inviteUser)
    .delete(userController.removeInvitation)

userRouter.route('/role')
    .post(userController.promoteUser)
    .delete(userController.degradeUser)

userRouter.route('/nickname')
    .put(userController.editNickname)

userRouter.route('/password')
    .put(userController.editPassword)

userRouter.route('/email')
    .put(userController.editEmail)

module.exports = userRouter;