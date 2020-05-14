import axios from 'axios'

/**
 * create an axios instance
 */
const service = axios.create({
  timeout: 60000, // request timeout
  withCredentials: true
})

/**
 * request interceptor
 */
service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json'
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
service.interceptors.response.use(response => response.data)

export default service
