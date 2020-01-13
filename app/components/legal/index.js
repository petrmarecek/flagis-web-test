import React from 'react'
import PropTypes from 'prop-types'
import { routes } from 'utils/routes'

// components
import TermsConditions from './terms-conditions'
import PrivacyPolicy from './privacy-policy'
import CookiesPolicy from './cookies-policy'
import Eula from './eula'
import Disclaimer from './disclaimer'

// styles
import { LegalWrapper } from './styles'

const getLegalContent = location => {
  console.log(location.pathname)
  switch (location.pathname) {
    case routes.legal.termsConditions:
      return <TermsConditions />
    case routes.legal.privacyPolicy:
      return <PrivacyPolicy />
    case routes.legal.cookiesPolicy:
      return <CookiesPolicy />
    case routes.legal.eula:
      return <Eula />
    case routes.legal.disclaimer:
      return <Disclaimer />
    default:
      return null
  }
}

const LegalContainer = ({ location }) => (
  <LegalWrapper>{getLegalContent(location)}</LegalWrapper>
)

LegalContainer.propTypes = {
  location: PropTypes.object,
}

export default LegalContainer
