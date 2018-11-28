import React  from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'

import { changeLocation, visibleInboxTasks } from 'redux/store/app-state/app-state.actions'
import { selectTask } from 'redux/store/tasks/tasks.actions'
import { getInboxTasksItems, getSelectionTasks } from 'redux/store/tasks/tasks.selectors'
import { getRoutingPathname } from 'redux/store/routing/routing.selectors'

import LeftPanel from 'components/panels/left-panel'
import TagTreeContent from 'components/contents/tag-tree-content'
import CenterPanel from 'components/panels/center-panel'
import InboxContent from 'components/contents/inbox-content'
import DetailContent from 'components/contents/detail-content'

const InboxPage = ({ inboxItems, pathname }) => {
  const template = '/user/inbox/'
  const numberTemplate = template.length
  const taskId = pathname.substring(numberTemplate)
  const isTaskId = inboxItems.includes(taskId)

  return (
    <div>
      <LeftPanel>
        <TagTreeContent/>
      </LeftPanel>
      <CenterPanel>
        {isTaskId ? <DetailContent/> : <InboxContent/>}
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
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidUpdate() {
      const {
        inboxItems,
        pathname,
        selectTasksItems,
        selectTask,
        changeLocation,
        visibleInboxTasks
      } = this.props

      const template = '/user/inbox/'
      const numberTemplate = template.length
      const taskId = pathname.substring(numberTemplate)
      const isTaskId = inboxItems.includes(taskId)
      let newSelectTaskItems = selectTasksItems
      
      // Set visibility for inbox tasks
      visibleInboxTasks()
      
      if (!isTaskId) {
        const template = '/user/inbox'

        if (inboxItems.size === 0) {
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
)(InboxPage)
