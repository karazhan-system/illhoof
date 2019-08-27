import axios from 'axios'
import config from './config.js'

// http请求通用错误处理函数
const errorHandle = (networkError, dataError) => {

}

// 发起Http请求函数，返回Promise对象
const request = options => {
  const httpInstance = axios.create({
    baseURL: config.host + config.api,
    timeout: 30000
  })

  // 请求拦截
  httpInstance.interceptors.request.use(function (config) {
    config.data = config.data || {}

    return config
  }, function (error) {
    errorHandle(error)
  })

  // 响应拦截
  httpInstance.interceptors.response.use(function (response) {
    return response.data
  }, function (error) {
    errorHandle(error)
  })

  return httpInstance(options)
}

export default request
