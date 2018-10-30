import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getTaskDetail } from 'redux/store/app-state/app-state.selectors'

import LeftPanel from 'components/panels/left-panel'
import AccountMenu from 'components/account-menu/'
import CenterPanel from 'components/panels/center-panel'
import ArchiveContent from 'components/contents/archive-content'
import DetailContent from 'components/contents/detail-content'

const ArchivePage = ({ taskDetail }) => (
  <div>
    <LeftPanel>
      <AccountMenu />
    </LeftPanel>
    <CenterPanel>
      {taskDetail ? <DetailContent/> : <ArchiveContent/>}
    </CenterPanel>
  </div>
)

ArchivePage.propTypes = {
  taskDetail: PropTypes.bool,
}

const mapStateToProps = state => ({
  taskDetail: getTaskDetail(state)
})

export default connect(mapStateToProps)(ArchivePage)
