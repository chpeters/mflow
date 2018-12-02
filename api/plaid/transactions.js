import res from '../lib/response'
import pico from '../lib/pico'
import moment from 'moment'

import { getValue } from '../lib/helpers'

// Retrieve Transactions for an Item
// https://plaid.com/docs/#transactions
export default pico(req => {
  // Pull transactions for the Item for the last 30 days
  const startDate = moment()
    .subtract(30, 'days')
    .format('YYYY-MM-DD')
  const endDate = moment().format('YYYY-MM-DD')

  client.getTransactions(
    getValue('ACCESS_TOKEN', req),
    startDate,
    endDate,
    {
      count: 250,
      offset: 0,
    },
    (error, transactions) => {
      if (error) {
        return res({ error })
      }
      return res({ transactions }, 400)
    }
  )
})
