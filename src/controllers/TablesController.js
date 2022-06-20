const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class TablesController {
  async create(req, res) {
    const { name, description } = req.body
    const user_id = req.user.id

    const table_id = await knex('tables').insert({
      name,
      description,
      user_id
    })

    const charactersInsert = character.map(name => {

    })
  }
}

