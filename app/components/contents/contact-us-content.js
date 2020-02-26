import React from 'react'
import PropTypes from 'prop-types'

// redux
import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { deselectError } from 'redux/store/app-state/app-state.actions'

// components
import ToastNotificationsContainer from 'components/toast-notifications'
import NavigationLandingPrimary from 'components/navigation/navigation-landing-primary'
import ContactUsContainer from '../forms/contact-us'

const ContactUsContent = ({ location }) => (
  <div>
    <NavigationLandingPrimary location={location} />
    <ContactUsContainer />
    <div className="floating-components">
      <ToastNotificationsContainer />
    </div>
  </div>
)

ContactUsContent.propTypes = {
  location: PropTypes.object,
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  deselectError,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      this.props.deselectError('contactUs')
    },
  })
)(ContactUsContent)
