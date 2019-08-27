const Router = require('koa-router')

const api = new Router()
api.prefix('/site')

api.get('/', async ctx => {
  
})

module.exports = api
