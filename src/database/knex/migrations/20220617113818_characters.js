exports.up = knex => knex.schema.createTable('characters', table =>{
  table.increments('id')
  table.text('name')
  table.text('player_name')
  table.integer('xp')
  table.int('table_id').references('id').inTable('tables').onDelete("CASCADE")
  table.integer('level')
})

exports.down = knex => knex.schema.dropTable('characters')