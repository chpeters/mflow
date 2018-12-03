import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import Card from './Card'

/**
 * Expects data of form [{key: string, value: number}...]
 * @param {string} title
 * @param {object} data
 * @param {enum} type
 */
const Dashboard = ({ title, data, type }) => (
  <Card>
    <h2>Hello world</h2>
    <ResponsiveBar data={data} height={450} colorBy="index" />
  </Card>
)

export default Dashboard
