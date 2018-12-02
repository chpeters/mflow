import Plaid from 'plaid'

export const handler = Plaid.create({
  apiVersion: 'v2',
  clientName: 'Plaid Quickstart',
  env: '<%= PLAID_ENV %>',
  product: ['transactions'],
  key: '<%= PLAID_PUBLIC_KEY %>',
  onSuccess: async public_token => {
    const response = await fetch(
      'https://www.mflow.tech/api/plaid/get_access_token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
          public_token,
        }),
      }
    )

    const json = await response.json()
    // do something with the json.access_token here
    console.log(json)
  },
})
