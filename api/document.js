const Router = require('koa-router')
const Document = require('../model/document')

const api = new Router()
api.prefix('/document')

// 新增文档
api.post('/', async ctx => {

})

// 删除文档
api.delete('/', async ctx => {
  ctx.verifyParams({
    ids: 'array'
  })
  const { ids = [] } = ctx.request.body

  const result = await Document.remove({ _id: { $in: ids } })
  if (result) {
    ctx.body = result    
  }
})

// 修改文档
api.put('/:id', async ctx => {

})

// 查询文档列表
api.get('/', async ctx => {
  const { size, index } = ctx.util.getPageInfo(ctx.query)
  const { taskId } = ctx.query
  const documents = await Document.find({ taskId }).sort({ createdAt: -1 }).limit(size).skip(index)
  const total = await Document.countDocuments({ taskId })
  const list = documents.map(document => document.toObject({ virtuals: true }))
  
  ctx.body = {
    list,
    total, 
  }
})

// 查询指定文档
api.get('/:_id', async ctx => {
  const { _id } = ctx.params
  const doc = await Document.findById(_id)
  ctx.body = doc
})

module.exports = api
