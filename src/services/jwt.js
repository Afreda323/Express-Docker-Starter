const jwt = require('jsonwebtoken')

module.exports = {
  createToken (userId) {
    return jwt.sign(userId, process.env.JWT_SECRET)
  },
}
