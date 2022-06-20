exports.up = knex => knex.schema.createTable('tables', table =>{
  table.increments('id')
  table.text('name')
  table.text('description')
  table.int('user_id').references('id').inTable('users')
  table.timestamp("created_at").default(knex.fn.now())
  table.timestamp("updated_at").default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable('table')