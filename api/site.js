const Router = require('koa-router')
const api = new Router()
const Site = require('../model/site')

api.prefix('/site')

// 新增站点
api.post('/', async ctx => {
  ctx.verifyParams({
    name: 'string',
    ip: 'string',
    passwd: 'string'
  })

  const site = await Site(ctx.request.body).save()
  ctx.body = site
})

// 删除站点
api.delete('/', async ctx => {
  ctx.verifyParams({
    ids: 'array'
  })
  const { ids = [] } = ctx.request.body

  const result = await Site.remove({ _id: { $in: ids } })
  if (result) {
    ctx.body = result    
  }
})

// 修改站点
api.put('/:_id', async ctx => {
  ctx.verifyParams({
    name: 'string',
    ip: 'string',
    passwd: 'string'
  })

  const { _id } = ctx.params
  const { name, ip, account, passwd } = ctx.request.body

  const site = await Site.findOneAndUpdate({ _id }, { name, ip, account, passwd })
  if (site) {
    ctx.body = site
  }  
})

// 查询站点列表
api.get('/', async ctx => {
  const { size, index } = ctx.util.getPageInfo(ctx.query)
  const sites = await Site.find().sort({ createdAt: -1 }).limit(size).skip(index)
  const total = await Site.countDocuments()
  const list = sites.map(site => site.toObject({ virtuals: true }))
  
  ctx.body = {
    list,
    total, 
  }

})

module.exports = api
