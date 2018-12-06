import React from 'react'
import Visualization from './Visualization'
import { Flex } from 'rebass'

const VisualizationList = ({ queries }) => {
  return (
    <>
      {queries.map(({ data, query: { name, visualization_type } }) => (
        <Flex justifyContent="center">
          <Visualization title={name} data={data} type={visualization_type} />
        </Flex>
      ))}
    </>
  )
}

export default VisualizationList
