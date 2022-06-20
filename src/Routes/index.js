const { Router } = require('express')

const usersRoutes = require('./user.routes.js')
const sessionsRoutes = require('./sessions.routes.js')

const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/sessions", sessionsRoutes)

module.exports = routes
