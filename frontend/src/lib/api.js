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

const getDashboardJson = []

const addDashboardJson = { dashboard_id: 1, user_id: 1, name: 'test' }

export const getDashboards = () => Promise.resolve(getDashboardJson)
export const addDashboard = () => Promise.resolve(addDashboardJson)

const transactionsJson = []

export const getTransactions = () => Promise.resolve(transactionsJson)

export const getQueries = id => Promise.resolve(queryResponseBar)

export const getTransactionsByQuery = query => Promise.resolve(barData)
