exports.up = (knex, Promise) => {
    return Promise.all([
        knex.schema.createTable('news', table => {
            table.increments('id').primary()
            table.string('title').notNull()
            table.string('description')
            table.integer('image_id')
            table.timestamps()
        })
    ])
}

exports.down = (knex, Promise) => {
    return Promise.all([
        knex.schema.dropTable('news')
    ])
}
