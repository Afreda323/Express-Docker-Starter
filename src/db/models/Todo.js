const todoItem = (sequelize, DataTypes) => {
  const TodoItem = sequelize.define('todoItem', {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  })

  TodoItem.sync()

  return TodoItem
}

module.exports = todoItem
