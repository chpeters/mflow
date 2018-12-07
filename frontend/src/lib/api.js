const fetch = require('node-fetch');

async function jsonFetch(url) {
  try {
    const res = await fetch(url);
    const resJson = await res.json();
    if (res.ok) {
      return resJson
    }
    else {
      console.log(`error: ${res.statusCode} message: ${resJson}`)
    }
  } catch (error) {
    console.log(error)
  }

}

export const getDashboards = () => Promise.resolve(getDashboardJson)
export const addDashboard = () => Promise.resolve(addDashboardJson)

const transactionsJson = []

// massage the data returned into the format expected by the nivo graph
// expected sql format: select <series> <x> <y> from transaction where <series> = <input>
// (or <series> = <inputx>)
function handleLineChart(data, query) {
  const series = query.select[0];
  const x = query.select[1];
  const y = query.select[2];
  const seriesMap = {};
  data.forEach((datum) => {
    if (seriesMap[datum[series]]) {
      seriesMap[datum[series]]["data"].push({x: datum[x], y: datum[y]});
    } else {
      seriesMap[datum[series]] = {
        id: datum[series],
        data: [{x: datum[x], y: datum[y]}]
      };
    }
  });
  const returnData = [];
  Object.keys(seriesMap).map(function(objectKey) {
    returnData.push(seriesMap[objectKey]);
  });
  return returnData;
}

// massage the data returned into the format expected by the nivo graph
// expected sql format: select <series> <value> from transaction where <series> = <input>
// (or <series> = <inputx>)
function handleBarAndPieChart(data, query) {
  const series = query.select[0];
  const value = query.select[1];
  const returnData = [];
  data.forEach((datum) => {
    returnData.push({id: datum[series], value: datum[value]})
  });
  return returnData;
}

export const getTransactionsByQuery = async query => {
  const visualization_type = query.visualization_type
  const data = await jsonFetch('mflow.tech/api/transaction/getTransactionsByQuery')
  switch (visualization_type) {
    case "LINE_CHART":
      // TODO replace the apiCall with the actual call to the endpoint
      return handleLineChart(data, query);
      break;
    case "BAR_CHART":
      // TODO replace the apiCall with the actual call to the endpoint
      return handleBarAndPieChart(data, query);
      break;
    case "PIE_CHART":
      // TODO replace the apiCall with the actual call to the endpoint
      return handleBarAndPieChart(data, query);
      break;
    default:
      console.log("Unknown visualization type provided");
  }
});

const getDashboardJson = []

const addDashboardJson = { dashboard_id: 1, user_id: 1, name: 'test' }

export const getQueries = id => Promise.resolve(queryResponseBar)

const barData = [{ id: 'test', value: 100 }, { id: 'test2', value: 200 }]
// const pieData = [
//   {
//     id: 'erlang',
//     label: 'erlang',
//     value: 321,
//     color: 'hsl(52, 70%, 50%)',
//   },
//   {
//     id: 'lisp',
//     label: 'lisp',
//     value: 331,
//     color: 'hsl(87, 70%, 50%)',
//   },
//   {
//     id: 'scala',
//     label: 'scala',
//     value: 314,
//     color: 'hsl(296, 70%, 50%)',
//   },
//   {
//     id: 'c',
//     label: 'c',
//     value: 385,
//     color: 'hsl(258, 70%, 50%)',
//   },
//   {
//     id: 'stylus',
//     label: 'stylus',
//     value: 65,
//     color: 'hsl(258, 70%, 50%)',
//   },
// ]
// const lineData = [
//   {
//     id: 'set1',
//     data: [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }],
//   },
//   {
//     id: 'set2',
//     data: [{ x: 1, y: 2 }, { x: 4, y: 4 }, { x: 6, y: 1 }],
//   },
// ]

const queryResponseBar = [
  {
    name: 'Bar',
    visualization_type: 'bar',
  },
  // {
  //   name: 'Line',
  //   visualization_type: 'line',
  // },
  // {
  //   name: 'Pie',
  //   visualization_type: 'pie',
  // },
]
