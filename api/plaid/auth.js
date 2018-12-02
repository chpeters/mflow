import res from '../lib/response'
import pico from '../lib/pico'

// Retrieve ACH or ETF Auth data for an Item's accounts
// https://plaid.com/docs/#auth
export default pico(req => {
  client.getAuth(ACCESS_TOKEN, function(error, authResponse) {
    if (error != null) {
      return res({
        error: error,
      })
    }
    return res({ error: null, auth: authResponse })
  })
})
