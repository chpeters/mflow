import res from '../lib/response'
import pico from '../lib/pico'
import {client} from '../lib/plaid'

// Exchange token flow - exchange a Link public_token for
// an API access_token
// https://plaid.com/docs/#exchange-token-flow
export default pico(req => {
  PUBLIC_TOKEN = req.body.public_token
  client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
    if (error != null) {
      return res({
        error: error,
      })
    }
    ACCESS_TOKEN = tokenResponse.access_token
    ITEM_ID = tokenResponse.item_id
    return res({
      access_token: ACCESS_TOKEN,
      item_id: ITEM_ID,
      error: null,
    })
  })
})
