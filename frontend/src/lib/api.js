async function jsonFetch(url) {
  try {
    const res = await fetch(url)
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

export const getDashboards = () => jsonFetch()

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
  const series = query.select[0]
  const value = query.select[1]
  const returnData = []
  data.forEach(datum => {
    returnData.push({ id: datum[series], value: datum[value] })
  })
  return returnData
}

export const getTransactionsByQuery = async query => {
  const visualization_type = query.visualization_type
  const data = await jsonFetch(
    'mflow.tech/api/transaction/getTransactionsByQuery'
  )
  switch (visualization_type) {
    case 'LINE_CHART':
      return handleLineChart(data, query)
    case 'BAR_CHART':
      return handleBarAndPieChart(data, query)
    case 'PIE_CHART':
      return handleBarAndPieChart(data, query)
    default:
      console.log('Unknown visualization type provided')
  }
}

const addDashboardJson = { dashboard_id: 1, user_id: 1, name: 'test' }
export const addDashboard = () => Promise.resolve(addDashboardJson)

export const getQueries = async id =>
  jsonFetch('mflow.tech/api/query/fetchAllQueries')
