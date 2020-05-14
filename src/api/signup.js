import request from '@/utils/http'

export function signup(data) {
  return request({
    url: 'http://localhost:3000/signup',
    method: 'POST',
    data
  })
}
