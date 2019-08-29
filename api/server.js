const Router = require('koa-router')
const api = new Router()
const Server = require('../model/server')

api.prefix('/server')

// 新增任务
api.post('/', async ctx => {
  ctx.verifyParams({
    name: 'string',
    ip: 'string',
    passwd: 'string'
  })

  const server = await Server(ctx.request.body).save()
  ctx.body = server
})

// 删除任务
api.delete('/', async ctx => {
  ctx.verifyParams({
    ids: 'array'
  })
  const { ids = [] } = ctx.request.body

  const result = await Server.remove({ _id: { $in: ids } })
  if (result) {
    ctx.body = result    
  }
})

// 修改任务
api.put('/:_id', async ctx => {
  ctx.verifyParams({
    name: 'string',
    ip: 'string',
    passwd: 'string'
  })

  const { _id } = ctx.params
  const { name, ip, account, passwd } = ctx.request.body

  const server = await Server.findOneAndUpdate({ _id }, { name, ip, account, passwd })
  if (server) {
    ctx.body = server
  }  
})

// 查询任务列表
api.get('/', async ctx => {
  const { size, index } = ctx.util.getPageInfo(ctx.query)
  const servers = await Server.find().sort({ createdAt: -1 }).limit(size).skip(index)
  const total = await Server.countDocuments()
  const list = servers.map(server => server.toObject({ virtuals: true }))
  
  ctx.body = {
    list,
    total, 
  }

})

module.exports = api
