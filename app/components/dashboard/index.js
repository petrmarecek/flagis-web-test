import React from 'react'
import PropTypes from 'prop-types'
import commonUtils from '../../redux/utils/common'
import { connect } from 'react-redux'
import { Doughnut, Pie, HorizontalBar } from 'react-chartjs-2'
import ShadowScrollbar from 'components/common/shadow-scrollbar'

import {
  getVisibleTags,
  getTagsRelations,
} from 'redux/store/tags/tags.selectors'
import { getTagColor } from '../../redux/utils/component-helper'

import { DashboardWrapper, DashboardGraph, DashboardLabel } from './styles'

const Dashboard = ({ tags, tagsRelations }) => {
  const relations = tagsRelations.reduce((result, relation, key) => {
    const tag = tags.items.find(tagItem => tagItem.id === key)
    result[tag.title] = relation.size
    return result
  }, {})

  const tagColors = tagsRelations.reduce((result, relation, key) => {
    const tag = tags.items.find(tagItem => tagItem.id === key)
    const colorIndex =
      tag.colorIndex === null
        ? commonUtils.computeIntHash(tag.title, 10)
        : tag.colorIndex

    result[tag.title] = getTagColor(colorIndex)
    return result
  }, {})

  const data = {
    labels: Object.keys(relations),
    datasets: [
      {
        data: Object.values(relations),
        backgroundColor: Object.values(tagColors),
        hoverBackgroundColor: Object.values(tagColors),
      },
    ],
  }

  const doughnutPie = {
    labels: data.labels,
    datasets: data.datasets,
    options: {
      legend: {
        position: 'left',
      },
    },
  }

  const horizontalBar = {
    labels: data.labels,
    datasets: data.datasets,
    options: {
      legend: {
        display: false,
      },
    },
  }

  const scrollStyle = {
    height: 'calc(100vh - 108px)',
    shadowHeight: 20,
    boxShadowTop: 'inset 0 10px 10px -5px rgba(231, 236, 237, 1)',
    boxShadowBottom: 'inset 0 -10px 10px -5px  rgba(231, 236, 237, 1)',
    overflow: 'hidden',
  }

  return (
    <ShadowScrollbar style={scrollStyle}>
      <DashboardWrapper>
        <DashboardGraph>
          <DashboardLabel> Tag Relations - Doughnt </DashboardLabel>
          <Doughnut data={doughnutPie} options={doughnutPie.options} />
        </DashboardGraph>

        <DashboardGraph>
          <DashboardLabel> Tag Relations - Pie </DashboardLabel>
          <Pie data={doughnutPie} options={doughnutPie.options} />
        </DashboardGraph>

        <DashboardGraph>
          <DashboardLabel> Tag Relations - Bar </DashboardLabel>
          <HorizontalBar data={horizontalBar} options={horizontalBar.options} />
        </DashboardGraph>
      </DashboardWrapper>
    </ShadowScrollbar>
  )
}

Dashboard.propTypes = {
  tags: PropTypes.object,
  tagsRelations: PropTypes.object,
}

const mapStateToProps = state => ({
  tags: getVisibleTags(state),
  tagsRelations: getTagsRelations(state),
})

export default connect(mapStateToProps)(Dashboard)
