async function jsonFetch(url, options) {
  try {
    const res = await fetch(url, { mode: 'cors', ...options })
    const resJson = await res.json()
    if (res.ok) {
      return resJson
    } else {
      console.log(`error: ${res.statusCode} message: ${resJson}`)
    }
  } catch (error) {
    console.log(error)
  }
}

export const getDashboards = id =>
  jsonFetch(`https://mflow.tech/api/dashboards/read?id=${id}`)

// massage the data returned into the format expected by the nivo graph
// expected sql format: select <series> <x> <y> from transaction where <series> = <input>
// (or <series> = <inputx>)
function handleLineChart(data, query) {
  const series = query.select[0]
  const x = query.select[1]
  const y = query.select[2]
  const seriesMap = {}
  data.forEach(datum => {
    if (seriesMap[datum[series]]) {
      seriesMap[datum[series]]['data'].push({ x: datum[x], y: datum[y] })
    } else {
      seriesMap[datum[series]] = {
        id: datum[series],
        data: [{ x: datum[x], y: datum[y] }],
      }
    }
  })
  const returnData = []
  Object.keys(seriesMap).forEach(objectKey => {
    returnData.push(seriesMap[objectKey])
  })
  return returnData
}

// massage the data returned into the format expected by the nivo graph
// expected sql format: select <series> <value> from transaction where <series> = <input>
// (or <series> = <inputx>)
function handleBarAndPieChart(data, query) {
  console.log(query)
  const series = query.select[0]
  const value = `${query.function[0].function}(${query.function[0].key})`
  console.log(series, value, data)
  const returnData = []
  data.forEach(datum => {
    returnData.push({ id: datum[series], value: datum[value] })
  })
  return returnData
}

export const getTransactionsByQuery = async (query, id) => {
  const visualization_type = query.visualization_type
  const query_json = query.query_json
  const encodedQuery = encodeURIComponent(query_json)
  const parsed_json = JSON.parse(query_json)
  const data = await jsonFetch(
    `https://mflow.tech/api/transaction/fetchTransactionsFromQuery?query=${encodedQuery}&id=${id}`
  )
  switch (visualization_type) {
    case 'LINE_CHART':
      return handleLineChart(data, parsed_json)
    case 'BAR_CHART':
      return handleBarAndPieChart(data, parsed_json)
    case 'PIE_CHART':
      return handleBarAndPieChart(data, parsed_json)
    default:
      console.log('Unknown visualization type provided')
  }
}

// const addDashboardJson = { dashboard_id: 1, user_id: 1, name: 'test' }
export const addDashboard = () =>
  jsonFetch(`https://mflow.tech/api/dashboards/create`, { method: 'POST' })

export const getQueries = async id =>
  jsonFetch(`https://mflow.tech/api/query/fetchAllQueries?id=${id}`)
