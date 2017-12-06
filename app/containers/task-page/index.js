import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getTaskTagDetail } from "redux/store/app-state/app-state.selectors"

//import LeftPanel from 'components/panels/left-panel'
//import CenterPanel from 'components/panels/center-panel'
//import TagTreeContent from 'components/contents/tag-tree-content'
//import TasksContent from 'components/contents/tasks-content'
//import TaskDetailContent from 'components/contents/task-detail-content'

class TaskPage extends React.Component {

  static propTypes = {
    taskDetail: PropTypes.bool,
  }

  getContent() {
    /*if (this.props.taskDetail) {
      return (
        <TaskDetailContent />
      )
    }

    return (
      <TasksContent />
    )*/
  }

  render() {
    const content = this.getContent()
    return (
      <div>
        {/*<LeftPanel>
          <TagTreeContent />
        </LeftPanel>
        <CenterPanel>
          {content}
        </CenterPanel>*/}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  taskDetail: getTaskTagDetail(state).task
})

const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(TaskPage)
