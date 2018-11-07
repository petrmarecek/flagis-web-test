import React  from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getTaskInboxDetail } from 'redux/store/app-state/app-state.selectors'

import LeftPanel from 'components/panels/left-panel'
import TagTreeContent from 'components/contents/tag-tree-content'
import CenterPanel from 'components/panels/center-panel'
import InboxContent from 'components/contents/inbox-content'
import DetailContent from 'components/contents/detail-content'

const InboxPage = ({ inboxDetail }) => (
  <div>
    <LeftPanel>
      <TagTreeContent/>
    </LeftPanel>
    <CenterPanel>
      {inboxDetail ? <DetailContent/> : <InboxContent/>}
    </CenterPanel>
  </div>
)

InboxPage.propTypes = {
  inboxDetail: PropTypes.bool,
}

const mapStateToProps = state => ({
  inboxDetail: getTaskInboxDetail(state)
})

export default connect(mapStateToProps)(InboxPage)
