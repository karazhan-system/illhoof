const Router = require('koa-router')
const { getEnumList } = require('../common/enumerate')

const api = new Router()
api.prefix('/common')

// 查询字典
api.get('/dict', async ctx => {
  const { names } = ctx.query
  if (names) {
    const options = names.split(',').reduce((options, name) => {
      options[name] = getEnumList(name)
      return options
    }, {})
    ctx.body = options
  } else {
    ctx.body = {}
  }
})

module.exports = api
