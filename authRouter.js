const Router = require('express');
const router = new Router();
const controller = require('./authController');
const {check}  = require('express-validator');
const authMiddleware = require('./middleware/authMiddleware');
const roleMiddleware = require('./middleware/roleMiddleware');

router.post('/registration', [ 
  check('username', 'invalid username').notEmpty(),
  check('password', 'invalid password, more than 4 and less than 16').isLength({min: 4, max: 16}),
 ], controller.registration )
router.post('/login', controller.login)
router.get('/users', roleMiddleware(['ADMIN1', 'ADMIN']), controller.getUsers)
router.get('/quiztests', controller.getQuiz)

module.exports = router;