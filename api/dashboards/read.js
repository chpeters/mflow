import * as url from 'url'
import res from '../lib/response'
import pico from '../lib/pico'

export default pico(req =>
  res(`params: ${JSON.stringify(url.parse(req.url, true).query)}`, 200)
)
