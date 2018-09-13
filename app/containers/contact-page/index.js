import React  from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'

import { getContactDetail } from 'redux/store/app-state/app-state.selectors'

import LeftPanel from 'components/panels/left-panel'
import CenterPanel from 'components/panels/center-panel'
import AccountMenu from 'components/account-menu/'
import ContactContent from 'components/contents/contact-content'
import DetailContent from 'components/contents/detail-content'

const ContactPage = ({ onGetContent }) => (
  <div>
    <LeftPanel>
      <AccountMenu/>
    </LeftPanel>
    <CenterPanel>
      {onGetContent()}
    </CenterPanel>
  </div>
)


ContactPage.propTypes = {
  onGetContent: PropTypes.func,
}

const mapStateToProps = state => ({
  contactDetail: getContactDetail(state),
})

const mapDispatchToProps = {}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onGetContent: props => () => {
      if (props.contactDetail) {
        return (
          <DetailContent/>
        )
      } else {
        return (
          <ContactContent/>
        )
      }
    }
  })
)(ContactPage)
