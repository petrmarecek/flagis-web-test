import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'

import { getTaskArchiveDetail } from 'redux/store/app-state/app-state.selectors'

import LeftPanel from 'components/panels/left-panel'
import AccountMenu from 'components/account-menu/'
import LoggedAccount from 'components/common/logged-account'
import CenterPanel from 'components/panels/center-panel'
import ArchiveContent from 'components/contents/archive-content'
import DetailContent from 'components/contents/detail-content'

const ArchivePage = ({ onGetContent }) => (
  <div>
    <LeftPanel>
      <AccountMenu />
      <LoggedAccount />
    </LeftPanel>
    <CenterPanel>
      {onGetContent()}
    </CenterPanel>
  </div>
)


ArchivePage.propTypes = {
  onGetContent: PropTypes.func,
}

const mapStateToProps = state => ({
  archiveDetail: getTaskArchiveDetail(state)
})

const mapDispatchToProps = {}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onGetContent: props => () => {
      if (props.archiveDetail) {
        return (
          <DetailContent/>
        )
      } else {
        return (
          <ArchiveContent/>
        )
      }
    }
  })
)(ArchivePage)
