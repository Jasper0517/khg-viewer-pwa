import axios from 'axios'
import cookie from 'js-cookie'

/**
 * create an axios instance
 */
const service = axios.create({
  timeout: 60000, // request timeout
  withCredentials: true,
  baseURL: process.env.VUE_APP_BASE_URL || ''
})

/**
 * request interceptor
 */
service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json'
    config.headers.common.language = cookie.get('language')
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
    this.$message.error({
      showClose: true,
      message: data.msg
    })
  }
  return data
},
error => {
  const { data } = error.response
  this.$message.error({
    showClose: true,
    message: data.msg
  })
  return Promise.reject(data.msg)
})

export default service
