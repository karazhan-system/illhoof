const axios = require('axios')
const config = require('../config')
const { createCrawler } = require('./core.crawler')

module.exports = {
  createCrawler,
  
  // 解析生成markdown文本
  async parseMd (content) {
    const result = await axios({
      url: `${config.NLP}/markdown`,
      method: 'post',
      data: {
        content
      }
    })
    return result.data.md
  },

  // 解析分词获取keywords
  async parseKeyword (content) {
    const result = await axios({
      url: `${config.NLP}/word`,
      method: 'post',
      data: {
        content
      }
    })
    return result.data.words
  }
}