import res from '../lib/response'
import pico from '../lib/pico'

// Exchange token flow - exchange a Link public_token for
// an API access_token
// https://plaid.com/docs/#exchange-token-flow
export default pico(req => {
  ACCESS_TOKEN = req.body.access_token
  client.getItem(ACCESS_TOKEN, function(error, itemResponse) {
    return res({
      item_id: itemResponse.item.item_id,
      error: false,
    })
  })
})
