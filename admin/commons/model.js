import request from '@/commons/request.js'

export default {
  getDictData: data => request({
    url: '/dict/',
    method: 'get',
    params: {
      names: data.join(',')
    }
  })
}
