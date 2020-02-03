import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

// components
import ContactUsContent from 'components/contents/contact-us-content'

const ContactUsPage = ({ location }) => {
  useEffect(() => window.scrollTo(0, 0), [])
  return <ContactUsContent location={location} />
}

ContactUsPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default ContactUsPage
