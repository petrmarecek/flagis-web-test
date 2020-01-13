import React from 'react'
import PropTypes from 'prop-types'

// components
import NavigationLandingPrimary from 'components/navigation/navigation-landing-primary'
import AboutContainer from '../about'

const AboutContent = ({ location }) => (
  <div>
    <NavigationLandingPrimary location={location} />
    <AboutContainer />
  </div>
)

AboutContent.propTypes = {
  location: PropTypes.object,
}

export default AboutContent
