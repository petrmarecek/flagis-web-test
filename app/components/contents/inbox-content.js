import React from 'react'
import PropTypes from 'prop-types'

// redux
import { connect } from 'react-redux'
import { getInboxTasksItems } from 'redux/store/tasks/tasks.selectors'

// components
import TaskListContainer from '../task-list'

// styles
import {
  CenterPanelTop,
  CenterPanelTopPrimary,
  CenterPageTitle,
  CenterPanelScroll,
} from '../panels/styles'

const InboxContent = ({ inboxItemsSize }) => (
  <div>
    <CenterPanelTop>
      <CenterPanelTopPrimary bottomBorder={inboxItemsSize === 0}>
        <CenterPageTitle>Inbox</CenterPageTitle>
      </CenterPanelTopPrimary>
    </CenterPanelTop>
    <CenterPanelScroll offsetTop={60} offsetBottom={10}>
      <TaskListContainer />
    </CenterPanelScroll>
  </div>
)

InboxContent.propTypes = {
  inboxItemsSize: PropTypes.number,
}

const mapStateToProps = state => ({
  inboxItemsSize: getInboxTasksItems(state).size,
})

export default connect(mapStateToProps)(InboxContent)
