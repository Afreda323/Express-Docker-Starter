const todo = (sequelize, DataTypes) => {
  const Todo = sequelize.define('todo', {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
  })

  Todo.associate = models => {
    Todo.belongsTo(models.User)
  }

  return Todo
}

module.exports = todo
