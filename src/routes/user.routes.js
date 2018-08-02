const Router = require('express').Router
const controller = require('../controllers/user.controller')
const expressJwt = require('express-jwt')
const router = new Router()

router.post('/', controller.createUser)
router.post('/login', controller.logInUser)
router.get(
  '/me',
  expressJwt({ secret: process.env.JWT_SECRET }),
  controller.getUser,
)

module.exports = router
