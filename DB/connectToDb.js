const knex = require('knex');

const mariaDb = knex({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    database: 'ecommerce',
  }
})


const sqlite3Db = knex({
  useNullAsDefault: true
})

module.exports = { mariaDb, sqlite3Db }