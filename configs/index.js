console.log(process.env.MYSQL_HOST)

module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: process.env.KNEX_HOST,
            user: 'root',
            password: '',
            database: 'blog',
            charset: 'utf8'
        },
        migrations: {
            directory: './knex/migrations'
        }
    }
}