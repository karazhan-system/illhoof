const enumerate = {
  // 任务类型
  taskType: [
    { key: 1, value: '一次性任务' },
    { key: 2, value: '定时任务' },
  ],
  // 任务状态
  taskStatus: [
    { key: 0, value: '未开始' },
    { key: 1, value: '解析中' },
    { key: 2, value: '已解析' },
    { key: 3, value: '采集中' },
    { key: 4, value: '已采集' },
    { key: 5, value: '已停止' },
  ],
  // 文档状态
  documentStatus: [
    { key: 0, value: '未采集' },
    { key: 1, value: '已采集' },
    { key: 2, value: '已解析' },
    { key: 3, value: '已下载' },
  ],
}

module.exports = {
  getEnumList: name => enumerate[name] || [],
  getEnumValue: (name, key) => {
    if (enumerate[name]) {
      const result = enumerate[name].find(option => option.key === key)
      return result ? result.value : ''
    } else {
      return ''
    }
  }
}