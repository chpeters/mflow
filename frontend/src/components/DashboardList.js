import React from 'react'
import Dashboard from './Dashboard'
import { Flex } from 'rebass'

const DashboardList = ({ dashboards }) => {
  return (
    <>
      {dashboards.map(({ title, data, type }) => (
        <Flex justifyContent="center">
          <Dashboard title={title} data={data} type={type} />
        </Flex>
      ))}
    </>
  )
}

export default DashboardList
