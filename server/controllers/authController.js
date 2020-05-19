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
            return res.status(400).send({message: "This email exists already !"});
          }
      
          if (checkNickname.length !== 0) {
            return res.status(400).send({message: "This nickname exists already !"});
          }
      
          await user.save((err) => {
            if (err) return res.status(400).send({message: "Something went wrong :("});
            res.status(201).send({nickname: user.nickname, id:user._id, notes: user.notes, teams: user.teams, invitations: user.invitations});
          });
        } catch (err) {
          res.sendStatus(400).send({message: "Something went wrong :("});
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
              
            return res.status(400).send({message: "Incorrect password"})

          })
          .catch(() => {
            res.status(400).send({message: "User not found"});
          });
      }
}
