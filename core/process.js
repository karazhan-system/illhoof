const { fork } = require('child_process')
const cache = require('../common/cache')
const path = require('path')

const setTaskProcess = async ({ _id, status }) => {
  const processKey = `task_${_id}`

  // 删除已有进程
  const pid = await cache.getAsync(processKey)
  if (pid !== null) {
    await cache.delAsync(processKey)
    process.kill(pid)
  }

  // 创建新进程
  const taskProcess = fork(path.resolve(__dirname, './task.js'))
  taskProcess.send({ _id, status })

  await cache.setAsync(processKey, taskProcess.pid)

  taskProcess.on('exit', code => {
    console.log('exit')
    cache.del(processKey)
  })

}

module.exports = {
  setTaskProcess
}