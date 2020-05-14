import request from '@/utils/http'

export function login(data) {
  return request({
    url: 'http://127.0.0.1:3000/login',
    method: 'POST',
    data
  })
}

export function EDACApi({
  baseUrl,
  data
}) {
  return request({
    url: `${baseUrl}/EDAC`,
    method: 'POST',
    data
  })
}

export function getKHRecord({
  baseUrl
}) {
  return request({
    url: `${baseUrl}/SD_Dump`,
    method: 'POST'
  })
}

export function normalApiControl({
  baseUrl,
  data
}) {
  return request({
    url: `${baseUrl}/Default`,
    method: 'POST',
    data
  })
}
