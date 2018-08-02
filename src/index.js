const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const morgan = require('morgan')
const logger = require('./logger')
const { sequelize } = require('./db')
const router = require('./routes')
const app = express()
const { PORT } = process.env

sequelize.authenticate()
  .then(() => {
    logger.info('Connection has been established successfully.')
  })
  .catch(err => {
    logger.error(`Unable to connect to the database: ${err}`)
  })

app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(morgan('combined', { 'stream': logger.stream }))
app.use('/api', router)

app.listen(PORT, () => {
  logger.info(`App up on ${PORT}`)
})
