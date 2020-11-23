import React from 'react'
import PropTypes from 'prop-types'
import { ChartWrapper, ChartTitle } from './chart-shared'
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Cell,
} from 'recharts'

const TagUseFrequencyChart = ({ stats }) => {
  return (
    <ChartWrapper>
      <ChartTitle>Tag use frequency</ChartTitle>
      <ResponsiveContainer width="100%" minHeight={350}>
        <BarChart
          data={stats.items}
          layout="vertical"
          maxBarSize={15}
          margin={{top: 40, right: 50, left: 50, bottom: 10}}>
          <CartesianGrid horizontal={false} strokeDasharray="3 3"/>
          <XAxis
            type="number"
            axisLine={false}
            tickLine={false}
            domain={[0, stats.maxValue]}
            interval="preserveStartEnd"
            ticks={stats.ticks}
            allowDecimals={false} />
          <YAxis
            type="category"
            dataKey="label"
            axisLine={false}
            tickLine={false} />
          <Tooltip cursor={{ fill: '#fafafa' }} />
          <Bar dataKey="count" label={{ position: 'right' }}>
            {
              stats.items.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))
            }
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  )
}

TagUseFrequencyChart.propTypes = {
  stats: PropTypes.shape({
    items: PropTypes.array,
    maxValue: PropTypes.number,
    ticks: PropTypes.any,
  })
}

export default TagUseFrequencyChart
