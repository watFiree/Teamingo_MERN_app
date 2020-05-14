const express = require("express");
const AuthController = require('../controllers/authController')

const authRouter = express.Router();

authRouter.route("/signup").post(AuthController.signup);

authRouter.route("/signin").post(AuthController.signin);

module.exports = authRouter;
