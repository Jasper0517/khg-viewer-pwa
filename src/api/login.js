import request from '@/utils/http'

export function login(data) {
  return request({
    url: 'http://localhost:3000/login',
    method: 'POST',
    data
  })
}
