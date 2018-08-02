const Router = require('express').Router
const userRoutes = require('./user.routes')
const router = new Router()

router.get('/healthCheck', (req, res) => res.status(200).send('All Good'))
router.use('/user', userRoutes)
module.exports = router
