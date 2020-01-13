import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

// components
import LegalContent from 'components/contents/legal-content'

const LegalPage = ({ location }) => {
  useEffect(() => window.scrollTo(0, 0), [])
  return <LegalContent location={location} />
}

LegalPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default LegalPage
