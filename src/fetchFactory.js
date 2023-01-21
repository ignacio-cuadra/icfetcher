import _ from 'lodash'

export default function fetchFactory({
  baseUrl,
  url,
  method,
  headers,
  body,
  isJson,
  autoBodyStringfy = false,
  autoClearUndefinedBodyAttributes = false,
  bearerToken,
  mode
} = {}) {
  if (url === undefined) throw new Exception('url is undefined')
  if (baseUrl === undefined) baseUrl = ''
  if (headers === undefined) headers = {}
  if (method === undefined) method = 'GET'
  if (bearerToken) {
    if (headers['Authorization'])
      console.warn('bearerToken option redeclare Authorization header (with Bearer prefix)')
    headers['Authorization'] = `Bearer ${bearerToken}`
  }
  if (isJson) {
    if (headers['Content-Type'] || headers['Accept'])
      console.warn(
        'isJson option redeclare Content-Type and Accept headers with value "application/json"'
      )
    headers['Content-Type'] = 'application/json'
    headers['Accept'] = 'application/json'
  }
  if (autoClearUndefinedBodyAttributes && typeof body === 'object')
    body = _.omitBy(body, _.isUndefined)
  if (autoBodyStringfy && typeof body === 'object') body = JSON.stringify(body)
  return fetch(baseUrl + url, {
    method,
    headers,
    body,
    mode
  })
}
