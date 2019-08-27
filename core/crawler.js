const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')
const Document = require('../model/document')

const createUA = () => {
  return 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.139 Chrome/66.0.3359.139 Safari/537.36'
}

class Crawler {
  constructor (options = {}) {
    this.domain = options.domain
    this.taskId = options.taskId
    this.entries = options.entries
  }

  async $fetch (url) {
    try {
      const result = await axios({
        headers: {
          'user-agent': createUA()
        },
        url,
      })
      const html = result.data
      return cheerio.load(html, {
        decodeEntities: false,
        xmlMode: true
      })
    } catch (error) {
      return null
    }
  }

  // 添加文档
  async $add ({ url, title }) {
    const doc = await Document.findOne({ url, taskId: this.taskId })
    if (!doc) {
      const result = await Document({ 
        url, 
        title,
        domain: this.domain,
        taskId: this.taskId
      }).save()
    }
  }

  // 保存文档
  async $save (_id, doc) {
    await Document.findOneAndUpdate({ _id }, { ...doc, status: 1 })
  }

  // 遍历文档
  async $each (callback) {
    const cursor = Document.find({ taskId: this.taskId }).cursor()

    let doc
    while (doc = await cursor.next()) {
      await callback(doc)
    }
  }

}

module.exports = Crawler