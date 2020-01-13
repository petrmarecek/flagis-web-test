import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

// components
import AboutContent from 'components/contents/about-content'

const AboutPage = ({ location }) => {
  useEffect(() => window.scrollTo(0, 0), [])
  return <AboutContent location={location} />
}

AboutPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default AboutPage
