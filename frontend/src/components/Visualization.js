import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { Card, Heading } from 'rebass'
import { ResponsiveLine } from '@nivo/line'
import { ResponsivePie } from '@nivo/pie'

/**
 * ResponsiveBar:
 * Expects data of form [{key: string, value: number}...]
 *
 * ResponsiveLine
 * Expects data of form [{id: string, data: [{x:number, y:number}]}]
 */
const Visualization = ({ title, data, type }) => {
  let choices = {
    BAR_CHART: (
      <ResponsiveBar
        data={data}
        margin={{
          top: 25,
          right: 0,
          bottom: 25,
          left: 35,
        }}
        height={375}
        colorBy="index"
      />
    ),
    PIE_CHART: (
      <ResponsivePie
        data={data}
        margin={{
          top: 25,
          right: 0,
          bottom: 25,
          left: 0,
        }}
        height={375}
      />
    ),
    LINE_CHART: (
      <ResponsiveLine
        data={data}
        margin={{
          top: 25,
          right: 15,
          bottom: 25,
          left: 35,
        }}
        height={375}
      />
    ),
  }

  return (
    <Card
      borderRadius={10}
      boxShadow="0px 2px 4px 0px rgba(0, 0, 0, 0.2)"
      width={1}
      mt={50}
      py={15}
      px={25}
      style={{ height: '450px', maxWidth: '800px', minWidth: '500px' }}
    >
      <Heading textAlign="center" mb={20}>
        {title}
      </Heading>
      {choices[type]}
    </Card>
  )
}

export default Visualization
