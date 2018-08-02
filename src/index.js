const express = require('express')
const logger = require('./logger')

const app = express()

app.listen(1234, () => {
  logger.error('App up on 1234')
})