import React from 'react'
import PropTypes from 'prop-types'

// redux
import { connect } from 'react-redux'
import { getContactDetail } from 'redux/store/app-state/app-state.selectors'

// components
import CenterPanel from 'components/panels/center-panel'
import DetailContent from 'components/contents/detail-content'
import ContactContent from 'components/contents/contact-content'

const ContactPage = ({ contactDetail }) => (
  <CenterPanel>
    {contactDetail ? <DetailContent /> : <ContactContent />}
  </CenterPanel>
)

ContactPage.propTypes = {
  contactDetail: PropTypes.bool,
}

const mapStateToProps = state => ({
  contactDetail: getContactDetail(state),
})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactPage)
