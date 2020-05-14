import request from '@/utils/http'

export function logout() {
  return request({
    url: 'http://localhost:3000/logout',
    method: 'get'
  })
}
