import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { Card } from 'rebass'

/**
 * Expects data of form [{key: string, value: number}...]
 * @param {string} title
 * @param {object} data
 * @param {enum} type
 */
const Dashboard = ({ title, data, type }) => (
  <Card
    borderRadius={10}
    boxShadow="0px 0px 12px 1px rgba(0, 0, 0, 0.2)"
    width={800}
    height={450}
    mt={50}
  >
    <h2>Hello world</h2>
    <ResponsiveBar data={data} height={450} colorBy="index" />
  </Card>
)

export default Dashboard
