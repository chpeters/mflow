import React from 'react'
import { Flex, Box, Heading } from 'rebass'
import DashboardList from './DashboardList'

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

  addDashboard = dashboard => {
    const { dashboards } = this.state
    this.setState({ dashboards: dashboards.concat(dashboard) })
  }

  removeDashboard = id => {
    const { dashboards } = this.state
    this.setState({ dashboards: dashboards.filter(d => d.id === id) })
  }

  addQuery = query => {
    const { queries } = this.state
    this.setState({ queries: queries.concat(query) })
  }

  removeQuery = id => {
    const { queries } = this.state
    this.setState({ queries: queries.filter(q => q.id === id) })
  }

  switchDashboard = id => {
    const { dashboards } = this.state
    this.setState({ currentDashboard: dashboards.findIndex(d => d.id === id) })
  }

  render() {
    return (
      <>
        <Flex justifyContent="center">
          <Box>
            <Heading as="h1" fontSize={36} my={25}>
              mFlow
            </Heading>
          </Box>
        </Flex>
        <DashboardList dashboards={dashboards} />
      </>
    )
  }
}

export default App
