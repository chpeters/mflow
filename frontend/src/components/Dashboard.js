import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { ResponsiveLine } from '@nivo/line'
import { ResponsivePie } from '@nivo/pie'
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

const pieData = [
  {
    "id": "erlang",
    "label": "erlang",
    "value": 321,
    "color": "hsl(52, 70%, 50%)"
  },
  {
    "id": "lisp",
    "label": "lisp",
    "value": 331,
    "color": "hsl(87, 70%, 50%)"
  },
  {
    "id": "scala",
    "label": "scala",
    "value": 314,
    "color": "hsl(296, 70%, 50%)"
  },
  {
    "id": "c",
    "label": "c",
    "value": 385,
    "color": "hsl(258, 70%, 50%)"
  },
  {
    "id": "stylus",
    "label": "stylus",
    "value": 65,
    "color": "hsl(258, 70%, 50%)"
  }
]

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
    <br />
    <ShadowCard>
      <h2>Hello world2</h2>
      <ResponsiveLine data={lineData} height={450}/>
    </ShadowCard>
    <br />
    <ShadowCard>
      <h2>Hello world3</h2>
      <ResponsivePie data={pieData} height={450}/>
    </ShadowCard>
  </div>
)

export default Dashboard
