import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'

import { getTaskDetail } from 'redux/store/app-state/app-state.selectors'

import LeftPanel from 'components/panels/left-panel'
import CenterPanel from 'components/panels/center-panel'
import TagTreeContent from 'components/contents/tag-tree-content'
import DetailContent from 'components/contents/detail-content'
import TasksContent from 'components/contents/tasks-content'

const TaskPage = ({ onGetContent }) => (
  <div>
    <LeftPanel>
      <TagTreeContent/>
    </LeftPanel>
    <CenterPanel>
      {onGetContent()}
    </CenterPanel>
  </div>
)

TaskPage.propTypes = {
  onGetContent: PropTypes.func,
}

const mapStateToProps = state => ({
  taskDetail: getTaskDetail(state),
})

const mapDispatchToProps = {}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onGetContent: props => () => {
      if (props.taskDetail) {
        return (
          <DetailContent/>
        )
      } else {
        return (
          <TasksContent/>
        )
      }
    }
  })
)(TaskPage)
