import React from 'react'
import PropTypes from 'prop-types'
import { routes } from 'utils/routes'
import { compose, lifecycle } from 'recompose'

// redux
import { connect } from 'react-redux'
import {
  hideInboxTasks,
  visibleArchivedTasks,
  primaryHiddenNavigationVisible,
  setPrimaryHiddenNavigationAnimation,
} from 'redux/store/app-state/app-state.actions'
import { selectTask } from 'redux/store/tasks/tasks.actions'
import {
  changeLocation,
  changeNavigation,
} from 'redux/store/routing/routing.actions'
import { getPrimaryHiddenNavigationVisibility } from 'redux/store/app-state/app-state.selectors'
import { getRoutingPathname } from 'redux/store/routing/routing.selectors'
import {
  getArchivedTasksItems,
  getSelectionTasks,
} from 'redux/store/tasks/tasks.selectors'

// components
import LeftPanelPrimaryContent from 'components/contents/left-panel-primary-content'
import CenterPanel from 'components/panels/center-panel'
import DetailContent from 'components/contents/detail-content'
import ArchiveContent from 'components/contents/archive-content'

const ArchivePage = ({ archivedItems, pathname }) => {
  const template = '/user/archive/'
  const numberTemplate = template.length
  const taskId = pathname.substring(numberTemplate)
  const isTaskId = archivedItems.includes(taskId)

  return (
    <div>
      <LeftPanelPrimaryContent />
      <CenterPanel>
        {isTaskId ? <DetailContent /> : <ArchiveContent />}
      </CenterPanel>
    </div>
  )
}

ArchivePage.propTypes = {
  archivedItems: PropTypes.object,
  pathname: PropTypes.string,
}

const mapStateToProps = state => ({
  archivedItems: getArchivedTasksItems(state),
  selectTasksItems: getSelectionTasks(state),
  pathname: getRoutingPathname(state),
  isNavigationPrimaryMoreVisible: getPrimaryHiddenNavigationVisibility(state),
})

const mapDispatchToProps = {
  changeLocation,
  changeNavigation,
  selectTask,
  hideInboxTasks,
  visibleArchivedTasks,
  primaryHiddenNavigationVisible,
  setPrimaryHiddenNavigationAnimation,
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount() {
      if (!this.props.isNavigationPrimaryMoreVisible) {
        this.props.primaryHiddenNavigationVisible()
        this.props.setPrimaryHiddenNavigationAnimation()
      }
    },
    componentDidUpdate() {
      const { archivedItems, pathname, selectTasksItems } = this.props
      const { user } = routes

      // Hide inbox tasks
      this.props.hideInboxTasks()

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

      let template = '/user/archive/'
      const numberTemplate = template.length
      const taskId = pathname.substring(numberTemplate)
      const isTaskId = archivedItems.includes(taskId)
      let newSelectTaskItems = selectTasksItems

      if (!isTaskId) {
        template = user.archive

        if (archivedItems.size === 0) {
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
)(ArchivePage)
