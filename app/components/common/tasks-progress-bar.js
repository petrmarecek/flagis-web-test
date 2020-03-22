import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  getTasksId,
  getCompletedTasksId,
} from 'redux/store/tasks/tasks.selectors'

import styled, { keyframes } from 'styled-components'
import { fontMain, borderRadius, transition } from '../styled-components-mixins'
import { colors } from '../styled-components-mixins/colors'
import { zoomIn } from 'react-animations'

const zoom = keyframes`${zoomIn}`

const ProgressBar = styled.div`
  position: absolute;
  right: 16px;
  bottom: 10px;
  z-index: 15;
  animation: 500ms ${zoom};
`

const Count = styled.div`
  ${fontMain}
  position: absolute;
  white-space: nowrap;
  color: ${colors.lostAtSea};
  bottom: 0;
  right: 195px;
  font-size: 12px;
  margin: 0 15px 0 0;
`

const Bar = styled.span`
  ${borderRadius('2px')}
  position: absolute;
  bottom: 4px;
  right: 0;
  z-index: 15;
  width: 200px;
  height: 4px;
  background-color: ${colors.white};
`

const CompletedBar = styled.span`
  ${borderRadius('2px')}
  ${transition('width 500ms ease-in-out')};
  position: absolute;
  bottom: 4px;
  left: -200px;
  float: left;
  z-index: 20;
  height: 4px;
  background-color: ${colors.hanumanGreen};
`

const TasksProgressBar = ({ tasksCount, completedTasksCount }) => {
  const count = `${completedTasksCount}/${tasksCount}`
  const width = Math.round((completedTasksCount * 200) / tasksCount)
  const preparedWidth = isNaN(width) ? 0 : width

  return (
    <ProgressBar>
      <Count>{count}</Count>
      <Bar />
      <CompletedBar style={{ width: `${preparedWidth}px` }} />
    </ProgressBar>
  )
}

TasksProgressBar.propTypes = {
  tasksCount: PropTypes.number,
  completedTasksCount: PropTypes.number,
}

const mapStateToProps = state => ({
  tasksCount: getTasksId(state).size,
  completedTasksCount: getCompletedTasksId(state).size,
})

export default connect(mapStateToProps)(TasksProgressBar)
