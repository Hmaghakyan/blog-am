exports.up = (knex, Promise) => {
    return Promise.all([
        knex.schema.createTable('images', table => {
            table.increments('id').primary()
            table.string('path').unique()
            table.string('alt')
            table.timestamps()
        })
    ])
}

exports.down = (knex, Promise) => {
    return Promise.all([
        knex.schema.dropTable('images')
    ])
}
