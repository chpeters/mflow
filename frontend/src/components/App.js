import React from 'react'
import { Flex, Box, Heading } from 'rebass'
import { getDashboards, getQueries, addDashboard } from '../lib/api'
import Dashboard from './Dashboard'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dashboards: null,
      queries: null,
      currentDashboard: 0,
    }
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
    this.setState({ queries: { [id]: newQueries } })
  }

  addQuery = query => {
    const { queries } = this.state
    this.setState({ queries: queries.concat(query) })
  }

  removeQuery = id => {
    const { queries } = this.state
    this.setState({ queries: queries.filter(q => q.id === id) })
  }

  getCurrentQueries = () => {
    const { dashboards, currentDashboard, queries } = this.state
    const currentId = dashboards[currentDashboard].dashboard_id
    return queries[currentId]
  }

  switchDashboard = async id => {
    const { dashboards, queries } = this.state
    const newIndex = dashboards.findIndex(d => d.dashboard_id === id)
    const newDashboardId = dashboards[newIndex].dashboard_id
    try {
      if (!queries || !queries[newDashboardId]) {
        const queriesforNextDashboard = await getQueries(newDashboardId)
        if (!queries) {
          this.setQueries(newDashboardId, queriesforNextDashboard)
        } else {
          this.updateQueries(newDashboardId, queriesforNextDashboard)
        }
        this.setState({
          currentDashboard: newIndex,
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  async componentDidMount() {
    try {
      const dashboards = await getDashboards(1)
      this.setDashboards(dashboards)
      if (dashboards && dashboards.length > 0) {
        const id = dashboards[0].dashboard_id
        const queriesForFirst = await getQueries(id)
        this.setQueries(id, queriesForFirst)
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { dashboards, currentDashboard, queries } = this.state

    if (!dashboards) {
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
                .map((d, index) => (
                  <button
                    key={index}
                    onClick={() => this.switchDashboard(d.dashboard_id)}
                  >
                    {d.name}
                  </button>
                ))}
            </Heading>
          </Box>
        </Flex>
        <Dashboard queries={this.getCurrentQueries()} />
      </>
    )
  }
}

export default App
