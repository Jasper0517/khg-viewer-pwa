import axios from 'axios'
import { Message } from 'element-ui'
import cookie from 'js-cookie'

/**
 * create an axios instance
 */
const service = axios.create({
  timeout: 60000, // request timeout
  withCredentials: true,
  baseURL: 'http://45.77.28.169:3000/'
})

/**
 * request interceptor
 */
service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json'
    config.headers.common['language'] = cookie.get('language')
    return config
  },
  error => {
    console.error(error) // for debug
    return Promise.reject(error)
  }
)

/**
 * response interceptor
 */
service.interceptors.response.use(response => {
  const { data } = response
  if (data.code !== 200) {
    Message.error({
      message: data.msg
    })
  }
  return data
},
error => {
  const { data } = error.response
  Message.error({
    message: data.msg
  })
  return Promise.reject(data.msg)
})

export default service
