import request from '@/utils/http'

export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}
