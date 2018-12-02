import plaid from 'plaid'
import envvar from 'envvar'

const PLAID_CLIENT_ID = envvar.string('PLAID_CLIENT_ID')
const PLAID_SECRET = envvar.string('PLAID_SECRET')
const PLAID_PUBLIC_KEY = envvar.string('PLAID_PUBLIC_KEY')
const PLAID_ENV = envvar.string('PLAID_ENV', 'sandbox')

// Initialize the Plaid client
// Find your API keys in the Dashboard (https://dashboard.plaid.com/account/keys)
export const client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV],
  { version: '2018-05-22' }
)
