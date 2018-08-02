const Router = require('express').Router
const userRoutes = require('./user.routes')
const todoRoutes = require('./todo.routes')
const router = new Router()

router.get('/healthCheck', (req, res) => res.status(200).send('All Good'))
router.use('/users', userRoutes)
router.use('/todos', todoRoutes)
module.exports = router
