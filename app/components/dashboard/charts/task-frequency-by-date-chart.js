import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ChartWrapper, ChartTitle } from './chart-shared'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

const labels = [
  { color: '#34A2EE', title: 'New Tasks' },
  { color: '#5BDBA3', title: 'Completed Tasks' },
]

const LegendContainer = styled.ul`
  position: absolute;
  bottom: 0px;
  left: 50px;
  display: flex;
  align-items: flex-start;
`

const LegendItem = styled.li`
  font-size: 12px;
  margin-right: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: center;

  &:before {
    content: '';
    display: block;
    width: 24px;
    height: 14px;
    margin-right: 5px;
    border-radius: 15px;
    background-color: ${({ color }) => color };
  }
`

const CustomizedAxisTick = ({ x, y, payload }) => (
  <g transform={`translate(${x},${y})`}>
    <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
  </g>
)

CustomizedAxisTick.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  payload: PropTypes.object,
}

const CustomizedLegend = ({ payload }) => (
  <LegendContainer>
    {payload.map((entry, index) => (
       <LegendItem key={`item-${index}`} color={labels[index].color}>{entry.value}</LegendItem>
    ))}
  </LegendContainer>
)

CustomizedLegend.propTypes = {
  payload: PropTypes.array,
}

const TaskFrequencyByDateChart = ({ stats }) => {
  return (
    <ChartWrapper>
      <ChartTitle>Task frequency by date</ChartTitle>
      <ResponsiveContainer width="100%" minHeight={400}>
        <LineChart
          data={stats.items}
          margin={{top: 40, right: 50, left: 10, bottom: 10}}>
          <CartesianGrid vertical={false} strokeDasharray="3 3"/>
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={<CustomizedAxisTick />}
          />
          <YAxis
            padding={{ right: 20 }}
            axisLine={false}
            tickLine={false}
            domain={[0, stats.maxValue]}
            interval="preserveStartEnd"
            ticks={stats.ticks}
            allowDecimals={false} />
          <Tooltip/>
          <Legend content={CustomizedLegend} height={80} />
          <Line
            type="monotone"
            dataKey="New Tasks"
            stroke="#34A2EE"
            strokeWidth={2}
            activeDot={{r: 8}}
            legendType="circle" />
          <Line type="monotone"
            dataKey="Completed Tasks"
            stroke="#5BDBA3"
            strokeWidth={2}
            activeDot={{r: 8}}
            legendType="circle" />
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  )
}

TaskFrequencyByDateChart.propTypes = {
  stats: PropTypes.shape({
    items: PropTypes.array,
    maxValue: PropTypes.number,
  })
}

export default TaskFrequencyByDateChart
