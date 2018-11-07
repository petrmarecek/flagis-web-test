import React  from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getContactDetail } from 'redux/store/app-state/app-state.selectors'

import LeftPanel from 'components/panels/left-panel'
import CenterPanel from 'components/panels/center-panel'
import AccountMenu from 'components/account-menu/'
import ContactContent from 'components/contents/contact-content'
import DetailContent from 'components/contents/detail-content'

const ContactPage = ({ contactDetail }) => (
  <div>
    <LeftPanel>
      <AccountMenu/>
    </LeftPanel>
    <CenterPanel>
      {contactDetail ? <DetailContent/> : <ContactContent/>}
    </CenterPanel>
  </div>
)

ContactPage.propTypes = {
  contactDetail: PropTypes.bool,
}

const mapStateToProps = state => ({
  contactDetail: getContactDetail(state),
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage)