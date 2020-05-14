import defaultRequest from '@/utils/http/request'

/**
 * 比分網專用
 */
export default req => {
  return defaultRequest.request({
    ...req,
    url: req.url || ''
  })
}
