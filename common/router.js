const Router = require('koa-router')
const api = new Router()

api.prefix('/api')

const setRoute = name => {
  const router = require(`../api/${name}`)
  api.use(router.routes(), router.allowedMethods())
}

setRoute('common')
setRoute('site')
setRoute('server')

module.exports = api