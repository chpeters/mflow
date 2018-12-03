import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { Card, Heading } from 'rebass'
import { ResponsiveLine } from '@nivo/line'
import { ResponsivePie } from '@nivo/pie'

const lineData = [
  {
    id: 'set1',
    data: [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }],
  },
  {
    id: 'set2',
    data: [{ x: 1, y: 2 }, { x: 4, y: 4 }, { x: 6, y: 1 }],
  },
]

const pieData = [
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
]

/**
 * ResponsiveBar:
 * Expects data of form [{key: string, value: number}...]
 *
 * ResponsiveLine
 * Expects data of form [{id: string, data: [{x:number, y:number}]}]
 */
const Dashboard = ({ title, data, type }) => {
  let choices = {
    bar: <ResponsiveBar data={data} height={375} colorBy="index" />,
    pie: <ResponsivePie data={pieData} height={375} />,
    line: <ResponsiveLine data={lineData} height={375} />,
  }

  return (
    <Card
      borderRadius={10}
      boxShadow="0px 0px 12px 1px rgba(0, 0, 0, 0.2)"
      width={800}
      mt={50}
      pt={15}
      px={25}
      style={{ height: '450px' }}
    >
      <Heading textAlign="center" mb={10}>
        {title}
      </Heading>
      {choices[type]}
    </Card>
  )
}

export default Dashboard
