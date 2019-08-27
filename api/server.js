const Router = require('koa-router')

const api = new Router()
api.prefix('/server')

api.get('/', async ctx => {
  
})

module.exports = api
