import React from 'react'
import PropTypes from 'prop-types'

// components
import NavigationLandingPrimary from 'components/navigation/navigation-landing-primary'
import NavigationLegal from 'components/navigation/navigation-legal'
import LegalContainer from '../legal'

const LegalContent = ({ location }) => (
  <div>
    <NavigationLandingPrimary location={location} />
    <NavigationLegal location={location} />
    <LegalContainer location={location} />
  </div>
)

LegalContent.propTypes = {
  location: PropTypes.object,
}

export default LegalContent
