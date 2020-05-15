const express = require("express");
const noteContoller = require('../controllers/noteController')

const noteRouter = express.Router();

noteRouter.route("/")
    .get(noteContoller.findAll)
    .post(noteContoller.createNote)
    .put(noteContoller.editNote)
    .delete(noteContoller.deleteNote)


module.exports = noteRouter;