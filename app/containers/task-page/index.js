import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'

import { changeLocation } from 'redux/store/app-state/app-state.actions'
import { selectTask } from 'redux/store/tasks/tasks.actions'
import { getTasksItems, getSelectionTasks } from 'redux/store/tasks/tasks.selectors'
import { getRoutingPathname } from 'redux/store/routing/routing.selectors'

import LeftPanel from 'components/panels/left-panel'
import CenterPanel from 'components/panels/center-panel'
import TagTreeContent from 'components/contents/tag-tree-content'
import DetailContent from 'components/contents/detail-content'
import TasksContent from 'components/contents/tasks-content'

const TaskPage = ({ tasksItems, pathname }) => {
  const template = '/user/tasks/'
  const numberTemplate = template.length
  const taskId = pathname.substring(numberTemplate)
  const isTaskId = tasksItems.includes(taskId)
  
  return (
    <div>
      <LeftPanel>
        <TagTreeContent/>
      </LeftPanel>
      <CenterPanel>
        {isTaskId ? <DetailContent/> : <TasksContent/>}
      </CenterPanel>
    </div>
  )
}

TaskPage.propTypes = {
  tasksItems: PropTypes.object,
  pathname: PropTypes.string,
}

const mapStateToProps = state => ({
  tasksItems: getTasksItems(state),
  selectTasksItems: getSelectionTasks(state),
  pathname: getRoutingPathname(state),
})

const mapDispatchToProps = {
  changeLocation,
  selectTask,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidUpdate() {
      const { tasksItems, pathname, selectTasksItems, selectTask, changeLocation } = this.props
      const template = '/user/tasks/'
      const numberTemplate = template.length
      const taskId = pathname.substring(numberTemplate)
      const isTaskId = tasksItems.includes(taskId)
      let newSelectTaskItems = selectTasksItems
      
      if (!isTaskId) {
        const template = '/user/tasks'

        if (tasksItems.size === 0) {
          return
        }
        
        if (pathname !== template) {
          changeLocation(template)
        }

        return
      }

      if (newSelectTaskItems.includes(taskId)) {
        return
      }

      newSelectTaskItems = newSelectTaskItems.clear().add(taskId)
      selectTask(newSelectTaskItems, null)
    }
  })
)(TaskPage)
