import React  from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getTaskDetail } from 'redux/store/app-state/app-state.selectors'

import LeftPanel from 'components/panels/left-panel'
import TagTreeContent from 'components/contents/tag-tree-content'
import CenterPanel from 'components/panels/center-panel'
import InboxContent from 'components/contents/inbox-content'
import DetailContent from 'components/contents/detail-content'

const InboxPage = ({ taskDetail }) => (
  <div>
    <LeftPanel>
      <TagTreeContent/>
    </LeftPanel>
    <CenterPanel>
      {taskDetail ? <DetailContent/> : <InboxContent/>}
    </CenterPanel>
  </div>
)

InboxPage.propTypes = {
  taskDetail: PropTypes.bool,
}

const mapStateToProps = state => ({
  taskDetail: getTaskDetail(state)
})

export default connect(mapStateToProps)(InboxPage)
