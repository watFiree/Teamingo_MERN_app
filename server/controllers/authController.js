const bcrypt = require("bcryptjs");
const User = require('../models/User');
const jwt = require("jsonwebtoken");

module.exports = {
    async signup(req, res){
        const checkNickname = await User.find({ nickname: req.body.nickname }).then(
          (res) => res
        );
        const checkEmail = await User.find({ email: req.body.email }).then(
          (res) => res
        );
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
      
        const user = new User({
          nickname: req.body.nickname,
          email: req.body.email,
          password: hashedPassword,
          invitations: [],
          notes: [],
          teams:[]
        });
      
        try {
          if (checkEmail.length !== 0) {
            console.log("wrong email");
            return res.sendStatus(404);
          }
      
          if (checkNickname.length !== 0) {
            return res.send(400).send("This nickname exists already !");
          }
      
          await user.save((err) => {
            if (err) return res.sendStatus(400);
            res.status(201).send({nickname: user.nickname, id:user._id, notes: user.notes, teams: user.teams});
          });
        } catch (err) {
          res.sendStatus(404).send(err);
        }
      },

      async signin(req, res){
        User.findOne({ nickname: req.body.nickname })
          .then(async (data) => {
            const comparePasswords = await bcrypt.compare(
              req.body.password,
              data.password
            );
            if (comparePasswords) {
              const token = jwt.sign({_id: data._id}, process.env.TOKEN_SECRET, {expiresIn: '5000s'});
      
              res.cookie('jwttoken', token, {
                httpOnly: true,
                path:'/'
              });
              return res.status(200).send({nickname: data.nickname, id:data._id,notes: data.notes, teams: data.teams, invitations: data.invitations})
            }
            return res.sendStatus(404);
          })
          .catch((err) => {
            res.sendStatus(404);
            console.log(err);
          });
      }
}
