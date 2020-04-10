import React, { useState, useEffect } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import Loader from 'components/common/loader'
import { connect } from 'react-redux'
import ShadowScrollbar from 'components/common/shadow-scrollbar'
import { getAuth } from 'redux/store/auth/auth.selectors'
import { getTagColor, getColorIndex } from 'redux/utils/component-helper'
import { DashboardWrapper } from './styles'
import api from 'redux/utils/api'
import date from 'redux/utils/date'
import { getTags } from 'redux/store/tags/tags.selectors'
import MostUsedTagsChart from './charts/most-used-tags-chart'
import TasksByDateChart from './charts/tasks-by-date-chart'

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

const Dashboard = ({ auth, tags }) => {

  const [isLoading, setIsLoading] = useState(true)
  const [taskStats, setTaskStats] = useState([])
  const [tagStats, setTagStats] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      api.setApiToken(auth.accessToken)
      const stats = await api.stats.getStats()
      const taskStatsData = prepareTaskStats(stats)
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
        <TasksByDateChart stats={taskStats} />
        <MostUsedTagsChart stats={tagStats} />
      </DashboardWrapper>
    </ShadowScrollbar>
  )
}

Dashboard.propTypes = {
  auth: PropTypes.object,
  tags: PropTypes.shape({
    isFetching: PropTypes.bool,
    items: PropTypes.array,
  })
}

const mapStateToProps = state => ({
  auth: getAuth(state),
  tags: getTags(state),
})

export default connect(mapStateToProps)(Dashboard)
