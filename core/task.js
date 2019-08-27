const fs = require('fs')
const path = require('path')
const Task = require('../model/task')
const Rule = require('../model/rule')

process.on('message', async data => {
  const { _id, status } = data

  try {
    const { domain, entries, cron } = await Task.findById(_id)
    const { script } = await Rule.findOne({ domain })
    const WebCrawler = eval(script)
    const crawler = new WebCrawler({ taskId: _id, domain, entries })

    if (status === 1) {
      console.log('parse start');
      await crawler.parse()   
      await Task.findOneAndUpdate({ _id }, { status: 2 }, { useFindAndModify: false })
      console.log('parse end');
    }
    if (status === 3) {
      console.log('run start');
      await crawler.run()
      await Task.findOneAndUpdate({ _id }, { status: 4 }, { useFindAndModify: false })
      console.log('run end');
    }
    
    process.exit()
  } catch (error) {
    console.log(error)
  }
})
