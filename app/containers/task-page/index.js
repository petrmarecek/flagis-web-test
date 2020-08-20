import React from 'react'
import PropTypes from 'prop-types'
import { routes } from 'utils/routes'
import { compose, lifecycle } from 'recompose'

// redux
import { connect } from 'react-redux'
import { hideArchivedTasks } from 'redux/store/app-state/app-state.actions'
import { selectTask } from 'redux/store/tasks/tasks.actions'
import { changeLocation } from 'redux/store/routing/routing.actions'
import { getRoutingPathname } from 'redux/store/routing/routing.selectors'
import {
  getTasksItems,
  getInboxTasksItems,
  getSelectionTasks,
} from 'redux/store/tasks/tasks.selectors'

// components
import LeftPanelPrimaryContent from 'components/contents/left-panel-primary-content'
import CenterPanel from 'components/panels/center-panel'
import DetailContent from 'components/contents/detail-content'
import TasksContent from 'components/contents/tasks-content'

const TaskPage = ({ tasksItems, inboxTasksItems, pathname }) => {
  const template = '/user/tasks/'
  const numberTemplate = template.length
  const taskId = pathname.substring(numberTemplate)
  const isTaskId =
    tasksItems.includes(taskId) || inboxTasksItems.includes(taskId)

  return (
    <div>
      <LeftPanelPrimaryContent />
      <CenterPanel>
        {isTaskId ? <DetailContent /> : <TasksContent />}
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
  inboxTasksItems: getInboxTasksItems(state),
  selectTasksItems: getSelectionTasks(state),
  pathname: getRoutingPathname(state),
})

const mapDispatchToProps = {
  changeLocation,
  selectTask,
  hideArchivedTasks,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidUpdate() {
      const {
        tasksItems,
        inboxTasksItems,
        pathname,
        selectTasksItems,
      } = this.props
      const { user } = routes

      // Hide archived tasks
      this.props.hideArchivedTasks()

      // redirect to tags detail
      const isTagsPage = pathname.substring(0, user.tags.length) === user.tags
      if (isTagsPage) {
        this.props.changeLocation(pathname)
        return
      }

      // redirect to notifications list
      const isNotificationPage =
        pathname.substring(0, user.notifications.length) === user.notifications
      if (isNotificationPage) {
        this.props.changeLocation(pathname)
        return
      }

      let template = '/user/tasks/'
      const numberTemplate = template.length
      const taskId = pathname.substring(numberTemplate)
      const isTaskId =
        tasksItems.includes(taskId) || inboxTasksItems.includes(taskId)
      let newSelectTaskItems = _.cloneDeep(selectTasksItems)

      if (!isTaskId) {
        template = user.tasks

        if (tasksItems.size === 0) {
          return
        }

        if (pathname !== template) {
          this.props.changeLocation(template)
        }

        return
      }

      if (newSelectTaskItems.includes(taskId)) {
        return
      }

      newSelectTaskItems = newSelectTaskItems.clear().add(taskId)
      this.props.selectTask(newSelectTaskItems, null)
    },
  })
)(TaskPage)
