import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getTaskArchiveDetail } from 'redux/store/app-state/app-state.selectors'

import LeftPanel from 'components/panels/left-panel'
import AccountMenu from 'components/account-menu/'
import CenterPanel from 'components/panels/center-panel'
import ArchiveContent from 'components/contents/archive-content'
import DetailContent from 'components/contents/detail-content'

const ArchivePage = ({ archiveDetail }) => (
  <div>
    <LeftPanel>
      <AccountMenu />
    </LeftPanel>
    <CenterPanel>
      {archiveDetail ? <DetailContent/> : <ArchiveContent/>}
    </CenterPanel>
  </div>
)

ArchivePage.propTypes = {
  archiveDetail: PropTypes.bool,
}

const mapStateToProps = state => ({
  archiveDetail: getTaskArchiveDetail(state)
})

export default connect(mapStateToProps)(ArchivePage)
