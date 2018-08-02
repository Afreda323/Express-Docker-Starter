const express = require('express')
const logger = require('./logger')
const { sequelize } = require('./db')

const app = express()
const { PORT } = process.env

sequelize.authenticate()
  .then(() => {
    logger.info('Connection has been established successfully.')
  })
  .catch(err => {
    logger.error(`Unable to connect to the database: ${err}`)
  })

app.listen(PORT, () => {
  logger.info(`App up on ${PORT}`)
})
