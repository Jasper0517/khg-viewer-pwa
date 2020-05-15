import request from '@/utils/http'

export function KHGLogin(data) {
  return request({
    url: 'http://localhost:3000/KHGLogin',
    method: 'POST',
    data
  })
}

export function EDAC(data) {
  return request({
    url: 'http://localhost:3000/EDAC',
    method: 'POST',
    data
  })
}

export function getKHRecord(data) {
  return request({
    url: 'http://localhost:3000/getKHRecord',
    method: 'POST',
    data
  })
}

export function normalApiControl(data) {
  return request({
    url: 'http://localhost:3000/normalApiControl',
    method: 'POST',
    data
  })
}
