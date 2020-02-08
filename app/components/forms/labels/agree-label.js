import React from 'react'
import { routes } from 'utils/routes'
import { Link } from 'react-router-dom'

const AgreeLabel = () => (
  <p>
    I agree to the{' '}
    <Link to={routes.legal.termsConditions} target="_blank">
      terms and conditions
    </Link>{' '}
    and{' '}
    <Link to={routes.legal.privacyPolicy} target="_blank">
      privacy policy
    </Link>
  </p>
)

export default AgreeLabel
