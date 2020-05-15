import request from '@/utils/http'

export function setting(data) {
  return request({
    url: 'http://localhost:3000/setting',
    method: 'PATCH',
    data
  })
}
