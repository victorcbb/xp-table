const { hash, compare } = require('bcryptjs')
const AppError = require('../utils/AppError')
const knex = require('../database/knex')

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body
    const checkUserExists = await knex('users').where('email', email)

    if (checkUserExists.length > 0) {
      throw new AppError("Esse e-mail já está em uso.")
    }

    const hashedExists = await hash(password, 8)

    await knex('users').insert({
      name,
      email,
      password: hashedExists
    })

    return res.status(201).json()
  }

  async update(req, res) {
    const { name, email, password, old_password } = req.body
    const user_id = req.user.id

    const user = await knex('users').where('id', user_id)

    if (!user) {
      throw new AppError("Usuário não existe")
    }

    if (email) {
      const userWithUpdatedEmail = await knex('users').where({ email })

      if (userWithUpdatedEmail[0] && userWithUpdatedEmail[0].id !== user[0].id ) {
        throw new AppError("Esse e-mail já pertence a outro usuário.")
      }
    }

    user[0].name = name ?? user[0].name    
    user[0].email = email ?? user[0].email   
    
    if (password && !old_password) {
      throw new AppError("Você precisa informar a senha antiga.")
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user[0].password)

      if (!checkOldPassword) {
        throw new AppError("Senha não confere")
      }

      user[0].password = await hash(password, 8)
    }

    await knex('users').update({
      name: user[0].name,
      email: user[0].email,
      password: user[0].password
    }).update('updated_at', knex.fn.now()).where("id", user_id)

    return res.json()
  }
}

module.exports = UsersController
