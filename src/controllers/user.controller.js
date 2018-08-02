const { User } = require('../db')
const logger = require('../logger')
const jwtService = require('../services/jwt')

module.exports = {
  async createUser (req, res) {
    const { emailAddress, password } = req.body
    if (password.trim().length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 chars' })
    }
    try {
      const user = await User.create({ emailAddress, password })
      const token = jwtService.createToken(user.id)

      return res.status(200).json({ id: user.id, token })
    } catch (e) {
      logger.error(e)
      return res.status(500).json({ status: 500, errors: e.errors })
    }
  },
  async logInUser (req, res) {
    const { emailAddress, password } = req.body

    if (password.trim().length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 chars' })
    }

    try {
      const user = await User.findOne({
        where: {
          emailAddress,
        },
      })

      if (!user) {
        return res.status(400).json({ error: 'Invalid email address' })
      }

      const isValidPassword = user.comparePassword(password)

      if (isValidPassword) {
        const token = jwtService.createToken(user.id)
        return res.status(200).json({ id: user.id, token })
      } else {
        return res.status(400).json({ error: 'Invalid password' })
      }
    } catch (e) {
      logger.error(e)
      return res.status(500).json({ status: 500, errors: e.errors })
    }
  },
  async getUser (req, res) {
    try {
      const users = await User.findOne({
        where: {
          id: req.user,
        },
        attributes: {
          exclude: ['password'],
        },
      })
      return res.status(200).json(users)
    } catch (e) {
      logger.error(e)
      return res.status(500).json({ error: e })
    }
  },
}
