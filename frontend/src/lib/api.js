const getDashboardJson = []

const addDashboardJson = { dashboard_id: 1, user_id: 1, name: 'test' }

export const getDashboards = () => Promise.resolve(getDashboardJson)
export const addDashboard = () => Promise.resolve(addDashboardJson)

const transactionsJson = []

export const getTransactions = () => Promise.resolve(transactionsJson)

const queriesJson = []
export const getQueries = id => Promise.resolve(queriesJson)
