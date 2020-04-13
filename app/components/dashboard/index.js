import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import PropTypes from 'prop-types'
import Loader from 'components/common/loader'
import ShadowScrollbar from 'components/common/shadow-scrollbar'
import { getTagColor, getColorIndex } from 'redux/utils/component-helper'
import { DashboardWrapper } from './styles'
import date from 'redux/utils/date'
import { getTags, getActiveTagsIds } from 'redux/store/tags/tags.selectors'
import TagUseFrequencyChart from './charts/tag-use-frequency-chart'
import TaskFrequencyByDateChart from './charts/task-frequency-by-date-chart'
import { getStats } from 'redux/store/stats/stats.selectors'
import * as statsActions from 'redux/store/stats/stats.actions'
import { generateTicks } from 'utils/charts'

const colorForTag = (tag, storeTags) => {
  const storeTag = storeTags.find(item => item.id === tag.id)
  const colorIndexCandidate = storeTag && typeof (storeTag.colorIndex) === 'number'
    ? storeTag.colorIndex
    : null

  const colorIndex = getColorIndex(colorIndexCandidate, tag.title)
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

const prepareTaskStats = stats => {
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

  const maxValue = Math.max(newTasksByDate.maxValue, completedTasksByDate.maxValue)
  const ticks = generateTicks(5, maxValue)

  return {
    maxValue,
    ticks,
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

  const ticks = generateTicks(5, maxValue)
  return {
    maxValue,
    ticks,
    items,
  }
}

const Dashboard = ({ tags, stats, activeTags, fetchStats }) => {

  const [statsReady, setStatsReady] = useState(false)
  const [taskStats, setTaskStats] = useState({})
  const [tagStats, setTagStats] = useState({})

  useEffect(() => {
    fetchStats()
  }, [activeTags])

  useEffect(() => {
    if (!stats.isFetching) {
      const taskStatsData = prepareTaskStats(stats.data)
      const tagStatsData = prepareTagStats(stats.data, tags.items)
      setTaskStats(taskStatsData)
      setTagStats(tagStatsData)
      setStatsReady(true)
    }
  }, [stats])

  const scrollStyle = {
    height: '100%',
  }

  if (stats.isFetching || !statsReady) {
    return <Loader />
  }

  return (
    <ShadowScrollbar style={scrollStyle}>
      <DashboardWrapper>
        <TaskFrequencyByDateChart stats={taskStats} />
        <TagUseFrequencyChart stats={tagStats} />
      </DashboardWrapper>
    </ShadowScrollbar>
  )
}

Dashboard.propTypes = {
  tags: PropTypes.shape({
    isFetching: PropTypes.bool,
    items: PropTypes.array,
  }),
  stats: PropTypes.shape({
    isFetching: PropTypes.bool,
    data: PropTypes.object,
  }),
  fetchStats: PropTypes.func,
}

const mapDispatchToProps = {
  fetchStats: statsActions.fetchStats
}

const mapStateToProps = state => ({
  tags: getTags(state),
  activeTags: getActiveTagsIds(state),
  stats: getStats(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
