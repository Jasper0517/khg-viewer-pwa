import request from '@/utils/http'

export function KHGLogin(data) {
  return request({
    url: '/KHGLogin',
    method: 'POST',
    data
  })
}

export function EDAC(data) {
  return request({
    url: '/EDAC',
    method: 'POST',
    data
  })
}

export function getKHRecord(data) {
  return request({
    url: '/getKHRecord',
    method: 'POST',
    data
  })
}

export function normalApiControl(data) {
  return request({
    url: '/normalApiControl',
    method: 'POST',
    data
  })
}
