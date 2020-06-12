import request from '@/utils/http'

export function setting(data) {
  return request({
    url: '/setting',
    method: 'PATCH',
    data
  })
}

export function changePassword(data) {
  return request({
    url: '/changePassword',
    method: 'PATCH',
    data
  })
}
