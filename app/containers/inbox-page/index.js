import React from 'react'
import PropTypes from 'prop-types'
import { routes } from 'utils/routes'
import { compose, lifecycle } from 'recompose'

// redux
import { connect } from 'react-redux'
import { selectTask } from 'redux/store/tasks/tasks.actions'
import { changeLocation } from 'redux/store/routing/routing.actions'
import { getRoutingPathname } from 'redux/store/routing/routing.selectors'
import { visibleInboxTasks } from 'redux/store/app-state/app-state.actions'
import {
  getInboxTasksItems,
  getSelectionTasks,
} from 'redux/store/tasks/tasks.selectors'

// components
import CenterPanel from 'components/panels/center-panel'
import DetailContent from 'components/contents/detail-content'
import InboxContent from 'components/contents/inbox-content'

const InboxPage = ({ inboxItems, pathname }) => {
  const template = '/user/inbox/'
  const numberTemplate = template.length
  const taskId = pathname.substring(numberTemplate)
  const isTaskId = inboxItems.includes(taskId)

  return (
    <CenterPanel>{isTaskId ? <DetailContent /> : <InboxContent />}</CenterPanel>
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
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentDidUpdate() {
      const { inboxItems, pathname, selectTasksItems } = this.props

      let template = '/user/inbox/'
      const numberTemplate = template.length
      const taskId = pathname.substring(numberTemplate)
      const isTaskId = inboxItems.includes(taskId)
      let newSelectTaskItems = selectTasksItems

      // Set visibility for inbox tasks
      this.props.visibleInboxTasks()

      if (!isTaskId) {
        template = routes.user.inbox

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
