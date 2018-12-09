import React from 'react'
import { Heading } from 'rebass'
import VisualizationList from './VisualizationList'
import { getTransactionsByQuery } from '../lib/api'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      queriesWithData: null,
    }
  }

  async componentDidMount() {
    const { queries } = this.props
    try {
      const responses = await Promise.all(
        queries.map(q => getTransactionsByQuery(q, 1))
      )
      const queriesWithData = queries.map((q, i) => {
        return {
          query: q,
          data: responses[i],
        }
      })
      this.setState({ queriesWithData })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { queriesWithData } = this.state
    console.log('queries with data', queriesWithData)
    if (!queriesWithData) {
      return <Heading>Loading...</Heading>
    }
    // gives vlist an array [{query:..., data: ...} ...]
    return <VisualizationList queries={queriesWithData} />
  }
}

export default Dashboard
