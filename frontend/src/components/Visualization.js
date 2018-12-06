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
    bar: <ResponsiveBar data={data} height={375} colorBy="index" />,
    pie: <ResponsivePie data={data} height={375} />,
    line: <ResponsiveLine data={data} height={375} />,
  }

  return (
    <Card
      borderRadius={10}
      boxShadow="0px 0px 12px 1px rgba(0, 0, 0, 0.2)"
      width={1}
      mt={50}
      pt={15}
      px={25}
      style={{ height: '450px', maxWidth: '800px', minWidth: '500px' }}
    >
      <Heading textAlign="center" mb={10}>
        {title}
      </Heading>
      {choices[type]}
    </Card>
  )
}

export default Visualization