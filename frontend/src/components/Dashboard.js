import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import ShadowCard from './ShadowCard'

/**
 * Expects data of form [{key: string, value: number}...]
 * @param {string} title
 * @param {object} data
 * @param {enum} type
 */
const Dashboard = ({ title, data, type }) => (
  <ShadowCard>
    <h2>Hello world</h2>
    <ResponsiveBar data={data} height={450} colorBy="index" />
  </ShadowCard>
)

export default Dashboard
