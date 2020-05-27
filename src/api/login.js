import request from '@/utils/http'

export function login(data) {
  return request({
    url: '/login',
    method: 'POST',
    data
  })
}
