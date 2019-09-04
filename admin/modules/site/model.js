import request from '@/commons/request'

export default {
  createSite: data => request({
    url: '/site',
    method: 'post',
    data
  }),
  getSites: data => request({
    url: '/site',
    method: 'get',
    params: data
  }),
  editSite: ({ _id, ...rest }) => request({
    url: `/site/${_id}`,
    method: 'put',
    data: {
      ...rest
    }
  }),
  deleteSites: data => request({
    url: '/site',
    method: 'delete',
    data
  })
}