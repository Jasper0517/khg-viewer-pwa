import request from '@/utils/http'

export function login(data) {
  return request({
    url: '/login',
    method: 'POST',
    data
  })
}

export function verifyRecaptcha(response) {
  return request({
    url: '/verifyRecaptcha',
    method: 'POST',
    data: {
      'g-recaptcha-response': response
    }
  })
}

export function forgetPassword(data) {
  return request({
    url: '/forgetPassword',
    method: 'POST',
    data
  })
}
