import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { ResponsiveLine } from '@nivo/line'
import ShadowCard from './ShadowCard'

const lineData = [
    {
        id: "set1",
        data: [{x: 1,y: 1},{x: 2,y: 2},{x: 3,y: 3}]
    },
    {
        id: "set2",
        data: [{x: 1,y: 2},{x: 4,y: 4},{x: 6,y: 1}]
    }
];

/**
 * ResponsiveBar:
 * Expects data of form [{key: string, value: number}...]
 * @param {string} title
 * @param {object} data
 * @param {enum} type
 *
 * ResponsiveLine
 * Expects data of form [{id: string, data: [{x:number, y:number}]}]
 */
const Dashboard = ({ title, data, type }) => (
  <div>
    <ShadowCard>
      <h2>Hello world</h2>
      <ResponsiveBar data={data} height={450} colorBy="index" />
    </ShadowCard>
    <ShadowCard>
      <h2>Hello world2</h2>
      <ResponsiveLine data={lineData} />
    </ShadowCard>
  </div>
)

export default Dashboard
