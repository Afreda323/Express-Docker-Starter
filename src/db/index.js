const Sequelize = require('sequelize')
const {
  POSTGRES_USER,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
} = process.env

const CONNECTION = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres/${POSTGRES_DB}`

const sequelize = new Sequelize(CONNECTION, {
  dialect: 'postgres',
  operatorsAliases: Sequelize.Op,
})

const models = {
  User: sequelize.import('./models/User'),
  Todo: sequelize.import('./models/Todo'),
}

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models)
  }
})

models.sequelize = sequelize
models.Sequelize = Sequelize

module.exports = models
