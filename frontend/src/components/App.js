import React from 'react'
import { Flex, Box, Heading } from 'rebass'
import DashboardList from './DashboardList'
import {
  getDashboards,
  getTransactions,
  getQueries,
  addDashboard,
} from '../lib/api'

const dashboards = [
  {
    title: 'Bar',
    data: [{ id: 'test', value: 100 }, { id: 'test2', value: 200 }],
    type: 'bar',
  },
  {
    title: 'Line',
    data: [
      {
        id: 'set1',
        data: [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }],
      },
      {
        id: 'set2',
        data: [{ x: 1, y: 2 }, { x: 4, y: 4 }, { x: 6, y: 1 }],
      },
    ],
    type: 'line',
  },
  {
    title: 'Pie',
    data: [
      {
        id: 'erlang',
        label: 'erlang',
        value: 321,
        color: 'hsl(52, 70%, 50%)',
      },
      {
        id: 'lisp',
        label: 'lisp',
        value: 331,
        color: 'hsl(87, 70%, 50%)',
      },
      {
        id: 'scala',
        label: 'scala',
        value: 314,
        color: 'hsl(296, 70%, 50%)',
      },
      {
        id: 'c',
        label: 'c',
        value: 385,
        color: 'hsl(258, 70%, 50%)',
      },
      {
        id: 'stylus',
        label: 'stylus',
        value: 65,
        color: 'hsl(258, 70%, 50%)',
      },
    ],
    type: 'pie',
  },
]

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      transactions: null,
      dashboards: null,
      queries: null,
      currentDashboard: 0,
    }
  }

  setTransactions = transactions => {
    this.setState({ transactions })
  }

  setDashboards = dashboards => {
    this.setState({ dashboards })
  }

  addDashboard = async () => {
    const { dashboards } = this.state
    try {
      const dashboard = await addDashboard()
      this.setState({ dashboards: dashboards.concat(dashboard) })
      this.switchDashboard(dashboard.dashboard_id)
    } catch (err) {
      console.log(err)
    }
  }

  removeDashboard = id => {
    const { dashboards } = this.state
    this.setState({ dashboards: dashboards.filter(d => d.dashboard_id === id) })
  }

  setQueries = (id, queries) => {
    this.setState({ queries: { [id]: queries } })
  }

  updateQueries = (id, qs) => {
    const { queries } = this.state
    const newQueries = { ...queries, [id]: qs }
    this.setState({ queries: newQueries })
  }

  addQuery = query => {
    const { queries } = this.state
    this.setState({ queries: queries.concat(query) })
  }

  removeQuery = id => {
    const { queries } = this.state
    this.setState({ queries: queries.filter(q => q.id === id) })
  }

  switchDashboard = async id => {
    const { dashboards, queries } = this.state
    const newIndex = dashboards.findIndex(d => d.dashboard_id === id)
    try {
      if (!queries || !queries[newIndex]) {
        console.log('made it')
        const queriesforNextDashboard = await getQueries(newIndex)
        if (!queries) {
          this.setQueries(newIndex, queriesforNextDashboard)
        } else {
          this.updateQueries(newIndex, queriesforNextDashboard)
        }
      }
      this.setState({
        currentDashboard: newIndex,
      })
    } catch (err) {
      console.log(err)
    }
  }

  async componentDidMount() {
    try {
      const transactions = await getTransactions()
      const dashboards = await getDashboards()
      this.setTransactions(transactions)
      this.setDashboards(dashboards)
      if (dashboards && dashboards.length > 0) {
        const id = dashboards[0].id
        const queriesForFirst = await getQueries(id)
        this.setQueries(id, queriesForFirst)
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { transactions, dashboards, currentDashboard, queries } = this.state
    console.log(transactions, dashboards, currentDashboard, queries)

    if (!transactions || !dashboards) {
      return <Heading>Loading...</Heading>
    }

    if (dashboards.length === 0) {
      return (
        <>
          <Heading>No Dashboards</Heading>
          <button onClick={this.addDashboard}>add dashboard</button>
        </>
      )
    }

    if (!queries) {
      return <Heading>Loading...</Heading>
    }

    // guranteeed to have non-null transactions, at least one dashboard, and
    // one query entry
    return (
      <>
        <Flex justifyContent="center">
          <Box>
            <Heading as="h1" fontSize={36} my={25}>
              mFlow
            </Heading>
          </Box>
        </Flex>
        <Flex>
          <Box>
            <Heading fontSize={24} my={15}>
              Change current dashboard:
              {dashboards
                .filter(d => d.dashboard_id !== currentDashboard)
                .map(d => (
                  <button onClick={() => this.switchDashboard(d.dashboard_id)}>
                    {d.name}
                  </button>
                ))}
            </Heading>
          </Box>
        </Flex>
        <DashboardList dashboards={dashboards[currentDashboard]} />
      </>
    )
  }
}

export default App
