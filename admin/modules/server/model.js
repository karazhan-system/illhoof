import request from '@/commons/request'

export default {
  createRule: data => request({
    url: '/rule',
    method: 'post',
    data
  }),
  getRules: data => request({
    url: '/rule',
    method: 'get',
    params: data
  }),
  editRule: ({ _id, ...rest }) => request({
    url: `/rule/${_id}`,
    method: 'put',
    data: {
      ...rest
    }
  }),
  deleteRules: data => request({
    url: '/rule',
    method: 'delete',
    data
  })
}