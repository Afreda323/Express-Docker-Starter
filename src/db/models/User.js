const bcrypt = require('bcrypt')

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    emailAddress: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })

  User.beforeCreate((user) => {
    const hash = bcrypt.hashSync(String(user.password), 10)
    user.password = hash
  })

  User.prototype.comparePassword = function (somePassword) {
    return bcrypt.compareSync(somePassword, this.password)
  }

  User.associate = models => {
    User.hasMany(models.Todo)
  }

  User.sync()

  return User
}

module.exports = user
