const Router = require('express').Router
const controller = require('../controllers/todo.controller')
const expressJwt = require('express-jwt')
const router = new Router()

router.use(expressJwt({ secret: process.env.JWT_SECRET }))

router.get('/', controller.getTodos)
router.get('/:id', controller.getTodo)
router.post('/', controller.createTodo)

module.exports = router
