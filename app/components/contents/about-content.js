import React from 'react'
import PropTypes from 'prop-types'

// components
import NavigationLandingPrimary from 'components/navigation/navigation-landing-primary'
import AboutContainer from '../about'
import LandingFooter from 'components/landing/landing-footer'

const AboutContent = ({ location }) => (
  <div>
    <NavigationLandingPrimary location={location} />
    <AboutContainer />
    <LandingFooter />
  </div>
)

AboutContent.propTypes = {
  location: PropTypes.object,
}

export default AboutContent
