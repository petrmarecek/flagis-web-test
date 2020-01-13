import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { routes } from 'utils/routes'

// styles
import { NavigationLegalWrapper, LegalButton } from './styles'

const NavigationLegal = ({ location }) => {
  return (
    <NavigationLegalWrapper>
      <LegalButton active={location.pathname === routes.legal.termsConditions}>
        <Link to="/legal/terms-conditions">Terms and Conditions</Link>
      </LegalButton>
      <LegalButton active={location.pathname === routes.legal.privacyPolicy}>
        <Link to="/legal/privacy-policy">Privacy Policy</Link>
      </LegalButton>
      <LegalButton active={location.pathname === routes.legal.cookiesPolicy}>
        <Link to="/legal/cookies-policy">Cookies Policy</Link>
      </LegalButton>
      <LegalButton active={location.pathname === routes.legal.eula}>
        <Link to="/legal/eula">EULA</Link>
      </LegalButton>
      <LegalButton active={location.pathname === routes.legal.disclaimer}>
        <Link to="/legal/disclaimer">Disclaimer</Link>
      </LegalButton>
    </NavigationLegalWrapper>
  )
}

NavigationLegal.propTypes = {
  location: PropTypes.object,
}

export default NavigationLegal
