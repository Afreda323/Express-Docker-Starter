const { TodoItem } = require('../db')
const logger = require('../logger')

module.exports = {
  async getTodos (req, res) {
    try {
      const todoItems = await TodoItem.findAll({
        where: {
          userId: req.user,
        },
      })
      return res.status(200).json(todoItems)
    } catch (e) {
      logger.error(e)
      return res.status(500).json({ error: e })
    }
  },
  async createTodo (req, res) {
    const { text } = req.body

    if (text.trim().length < 1) {
      return res.status(400).json({ error: 'Enter todo item text.' })
    }

    try {
      const todoItem = await TodoItem.create({ text, userId: req.user })
      return res.status(200).json(todoItem)
    } catch (e) {
      logger.error(e)
      return res.status(500).json({ error: e })
    }
  },
  async getTodo (req, res) {
    const { id } = req.params
    try {
      const todoItem = await TodoItem.findOne({
        where: {
          id,
          userId: req.user,
        },
      })
      return res.status(200).json(todoItem)
    } catch (e) {
      logger.error(e)
      return res.status(500).json({ error: e })
    }
  },
  async deleteTodo (req, res) {
    const { id } = req.params
    try {
      const todoItem = await TodoItem.findOne({
        where: {
          id,
          userId: req.user,
        },
      })
      if (!todoItem) {
        return res.status(400).json({ error: 'Item does not exist' })
      }
      await todoItem.destroy()
      return res.status(200).json({ success: true })
    } catch (e) {
      logger.error(e)
      return res.status(500).json({ error: e })
    }
  },
  async editTodo (req, res) {
    const { id } = req.params
    const { text } = req.body

    if (text.trim().length < 1) {
      return res.status(400).json({ error: 'Enter todo item text.' })
    }

    try {
      const todoItem = await TodoItem.findOne({
        where: {
          id,
          userId: req.user,
        },
      })
      if (!todoItem) {
        return res.status(400).json({ error: 'Item does not exist' })
      }
      const newTodo = await todoItem.update({
        text,
      })

      return res.status(200).json(newTodo)
    } catch (e) {
      logger.error(e)
      return res.status(500).json({ error: e })
    }
  },
  async toggleTodo (req, res) {
    const { id } = req.params
    try {
      const todoItem = await TodoItem.findOne({
        where: {
          id,
          userId: req.user,
        },
      })
      if (!todoItem) {
        return res.status(400).json({ error: 'Item does not exist' })
      }
      const newTodo = await todoItem.update({
        isComplete: !todoItem.isComplete,
      })

      return res.status(200).json(newTodo)
    } catch (e) {
      logger.error(e)
      return res.status(500).json({ error: e })
    }
  },
}
