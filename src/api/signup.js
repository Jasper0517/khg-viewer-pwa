import request from '@/utils/http'

export function signup(data) {
  return request({
    url: '/signup',
    method: 'POST',
    data
  })
}
