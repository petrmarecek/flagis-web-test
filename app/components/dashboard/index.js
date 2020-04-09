import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import PropTypes from 'prop-types'
import Loader from 'components/common/loader'
import commonUtils from 'redux/utils/common'
import { connect } from 'react-redux'
import ShadowScrollbar from 'components/common/shadow-scrollbar'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Cell
} from 'recharts';

import { getAuth } from 'redux/store/auth/auth.selectors'
import { getTagColor } from 'redux/utils/component-helper'
import { DashboardWrapper, ChartWrapper } from './styles'
import api from 'redux/utils/api'
import date from 'redux/utils/date'
import { getTags } from 'redux/store/tags/tags.selectors'

const colorForTag = (tag, storeTags) => {
  const storeTag = storeTags.find(item => item.id === tag.id)
  const colorIndex =
    storeTag && typeof (storeTag.colorIndex) === 'number'
      ? storeTag.colorIndex
      : commonUtils.computeIntHash(tag.title, 10)

  const color = getTagColor(colorIndex)
  return color
}

const prepareData = items => {
  let maxValue = 0
  const index = items.reduce((acc, current) => {
    maxValue = Math.max(maxValue, current.count)
    acc[current.date] = current.count
    return acc
  }, {})

  return {
    index,
    maxValue,
  }
}

const prepareStats = stats => {
  const datesToShow = date.makeDateArray(moment().subtract(1, "months").toDate(), new Date())
  const newTasksByDate = prepareData(stats.newTasksByDate)
  const completedTasksByDate = prepareData(stats.completedTasksByDate)

  const items = datesToShow.map(dateLabel => {
    return {
      label: dateLabel,
      ["New Tasks"]: newTasksByDate.index[dateLabel] || 0,
      ["Completed Tasks"]: completedTasksByDate.index[dateLabel] || 0,
    }
  })

  return {
    maxValue: Math.max(newTasksByDate.maxValue, completedTasksByDate.maxValue),
    items,
  }
}

const prepareTagStats = (stats, storeTags) => {
  let maxValue = 0
  const items = stats.mostUsedTags.map(item => {
    maxValue = Math.max(maxValue, item.count)
    return {
      id: item.id,
      label: item.title,
      count: item.count,
      color: colorForTag(item, storeTags),
    }
  })

  return {
    maxValue: Math.max(stats.mostUsedTags.map),
    items,
  }
}

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

const ChartTitle = styled.div`
  padding: 0 50px;
  font-size: 20px;
  /* font-weight: bold; */
`

const Dashboard = ({ auth, tags }) => {

  const [isLoading, setIsLoading] = useState(true)
  const [taskStats, setTaskStats] = useState([])
  const [tagStats, setTagStats] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      api.setApiToken(auth.accessToken)
      const stats = await api.stats.getStats()
      const taskStatsData = prepareStats(stats)
      const tagStatsData = prepareTagStats(stats, tags.items)
      setTaskStats(taskStatsData)
      setTagStats(tagStatsData)
      setIsLoading(false)
    }

    setIsLoading(true)
    fetchData()
  }, [])

  const scrollStyle = {
    height: 'calc(100vh - 10px)',
    overflow: 'hidden',
  }

  if (!auth.accessToken || isLoading) {
    return <Loader />
  }

  return (
    <ShadowScrollbar style={scrollStyle}>
      <DashboardWrapper>
        <ChartWrapper>
          <ChartTitle>Number of tasks by date</ChartTitle>
          <ResponsiveContainer width="100%" minHeight={400}>
            <LineChart
              data={taskStats.items}
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
                domain={[0, taskStats.maxValue]}
                interval="preserveStartEnd"
                ticks={[0,3,6,9,12,15,18]} />
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
        <ChartWrapper>
          <ChartTitle>Most often used tags</ChartTitle>
          <ResponsiveContainer width="100%" minHeight={350}>
            <BarChart
              data={tagStats.items}
              layout="vertical"
              maxBarSize={15}
              margin={{top: 40, right: 50, left: 50, bottom: 10}}>
              <CartesianGrid horizontal={false} strokeDasharray="3 3"/>
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                domain={[0, tagStats.maxValue]}
                interval="preserveStartEnd"
                ticks={[1,2,3,4,5]} />
              <YAxis
                type="category"
                dataKey="label"
                axisLine={false}
                tickLine={false} />
              <Tooltip cursor={{ fill: '#fafafa' }} />
              <Bar dataKey="count" label={{ position: 'right' }}>
                {
                  tagStats.items.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))
                }
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </DashboardWrapper>
    </ShadowScrollbar>
  )
}

Dashboard.propTypes = {
  auth: PropTypes.object,
}

const mapStateToProps = state => ({
  auth: getAuth(state),
  tags: getTags(state),
})

export default connect(mapStateToProps)(Dashboard)
