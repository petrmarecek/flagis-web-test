import React from 'react'
import { routes } from 'utils/routes'
import { Link } from 'react-router-dom'

const AgreeLabel = () => (
  <p>
    I agree to the{' '}
    <Link to={routes.legal.termsConditions}>terms and conditions</Link> and{' '}
    <Link to={routes.legal.privacyPolicy}>and privacy policy</Link>
  </p>
)

export default AgreeLabel
