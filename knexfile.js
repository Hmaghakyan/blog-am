// Update with your config settings..
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
      charset: 'utf8'
    },
    migrations: {
      directory: './knex/migrations'
    }
  }
}
