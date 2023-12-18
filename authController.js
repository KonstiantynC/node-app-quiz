const User = require('./models/User');
const QuizTest = require('./models/QuizTest');
const Role = require('./models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const {secret} = require('./config')


generateAccessToken = (id, roles) => {
  const payload = {
    id, roles 
  };
  return jwt.sign(payload, secret, {expiresIn: '24h'} ) 
}


class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'registratin error', errors})
      }
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res.status(400).json({ message: 'username exists'})
      }
      const hashPassword = bcrypt.hashSync(password, 9);
      const userRole = await Role.findOne({value: 'USER' });
      const user = new User({username, password: hashPassword, roles: [ userRole.value ] });
      await user.save();
      return res.json({ message: 'user registrate' })
    } catch (error) {
      res.status(400).json({ message: 'registration error' })
    };
  };
  
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({username});
      if (!user) {
        return res.status(400).json({ message: `user ${username} do not exists`})
      };
      console.log(user);
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {  
        return res.status(400).json({ message: 'invalid password'})
      };
      const token = generateAccessToken(user._id, user.roles);
      return res.json({token})
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'login error' })
    };  
  };

  async getUsers(req, res) {
    try {
      const users = await User.find()
      res.json(users)
    } catch (error) {
      console.log(error)
    };
  };

  async getQuiz(req, res) {
    try {
      const quiz = new QuizTest();
      await quiz.save();
      res.json('test saved');
    } catch (error) {
      
    }
  }

}

module.exports = new authController;