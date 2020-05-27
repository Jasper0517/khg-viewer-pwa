import request from '@/utils/http'

export function setting(data) {
  return request({
    url: '/setting',
    method: 'PATCH',
    data
  })
}
