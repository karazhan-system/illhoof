import request from '@/commons/request'

export default {
  createServer: data => request({
    url: '/server',
    method: 'post',
    data
  }),
  getServers: data => request({
    url: '/server',
    method: 'get',
    params: data
  }),
  editServer: ({ _id, ...rest }) => request({
    url: `/server/${_id}`,
    method: 'put',
    data: {
      ...rest
    }
  }),
  deleteServers: data => request({
    url: '/server',
    method: 'delete',
    data
  })
}