import React from 'react'
import PropTypes from 'prop-types'
import { routes } from 'utils/routes'
import { compose, lifecycle } from 'recompose'

// redux
import { connect } from 'react-redux'
import { selectTask } from 'redux/store/tasks/tasks.actions'
import { changeLocation } from 'redux/store/routing/routing.actions'
import { getRoutingPathname } from 'redux/store/routing/routing.selectors'
import {
  visibleInboxTasks,
  hideArchivedTasks,
} from 'redux/store/app-state/app-state.actions'
import {
  getInboxTasksItems,
  getSelectionTasks,
} from 'redux/store/tasks/tasks.selectors'

// components
import LeftPanelPrimaryContent from 'components/contents/left-panel-primary-content'
import CenterPanel from 'components/panels/center-panel'
import DetailContent from 'components/contents/detail-content'
import InboxContent from 'components/contents/inbox-content'

const InboxPage = ({ inboxItems, pathname }) => {
  const template = '/user/inbox/'
  const numberTemplate = template.length
  const taskId = pathname.substring(numberTemplate)
  const isTaskId = inboxItems.includes(taskId)

  return (
    <div>
      <LeftPanelPrimaryContent />
      <CenterPanel>
        {isTaskId ? <DetailContent /> : <InboxContent />}
      </CenterPanel>
    </div>
  )
}

InboxPage.propTypes = {
  inboxItems: PropTypes.object,
  pathname: PropTypes.string,
}

const mapStateToProps = state => ({
  inboxItems: getInboxTasksItems(state),
  selectTasksItems: getSelectionTasks(state),
  pathname: getRoutingPathname(state),
})

const mapDispatchToProps = {
  changeLocation,
  selectTask,
  visibleInboxTasks,
  hideArchivedTasks,
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentDidUpdate() {
      const { inboxItems, pathname, selectTasksItems } = this.props
      const { user } = routes

      // Hide archived tasks
      this.props.hideArchivedTasks()

      // redirect to tasks
      if (pathname === user.tasks) {
        this.props.changeLocation(user.tasks)
        return
      }

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

      let template = '/user/inbox/'
      const numberTemplate = template.length
      const taskId = pathname.substring(numberTemplate)
      const isTaskId = inboxItems.includes(taskId)
      let newSelectTaskItems = selectTasksItems

      // Set visibility for inbox tasks
      this.props.visibleInboxTasks()

      if (!isTaskId) {
        template = user.inbox

        if (inboxItems.size === 0) {
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
)(InboxPage)
