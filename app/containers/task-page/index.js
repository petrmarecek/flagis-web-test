import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getTaskDetail } from 'redux/store/app-state/app-state.selectors'

import LeftPanel from 'components/panels/left-panel'
import CenterPanel from 'components/panels/center-panel'
import TagTreeContent from 'components/contents/tag-tree-content'
import DetailContent from 'components/contents/detail-content'
import TasksContent from 'components/contents/tasks-content'

const TaskPage = ({ taskDetail }) => (
  <div>
    <LeftPanel>
      <TagTreeContent/>
    </LeftPanel>
    <CenterPanel>
      {taskDetail ? <DetailContent/> : <TasksContent/>}
    </CenterPanel>
  </div>
)

TaskPage.propTypes = {
  taskDetail: PropTypes.bool,
}

const mapStateToProps = state => ({
  taskDetail: getTaskDetail(state),
})

export default connect(mapStateToProps)(TaskPage)
