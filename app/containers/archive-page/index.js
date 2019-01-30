import React from 'react'
import PropTypes from 'prop-types'

// redux
import { connect } from 'react-redux'
import { getTaskArchiveDetail } from 'redux/store/app-state/app-state.selectors'

// components
import CenterPanel from 'components/panels/center-panel'
import DetailContent from 'components/contents/detail-content'
import ArchiveContent from 'components/contents/archive-content'

const ArchivePage = ({ archiveDetail }) => (
  <CenterPanel>
    {archiveDetail ? <DetailContent /> : <ArchiveContent />}
  </CenterPanel>
)

ArchivePage.propTypes = {
  archiveDetail: PropTypes.bool,
}

const mapStateToProps = state => ({
  archiveDetail: getTaskArchiveDetail(state),
})

export default connect(mapStateToProps)(ArchivePage)
