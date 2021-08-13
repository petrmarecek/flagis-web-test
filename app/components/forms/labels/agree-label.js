import React from 'react'
import config from 'config'

const AgreeLabel = () => (
  <p>
    I agree to the{' '}
    <a href={`${config.landingURL}/legal/terms-of-use`} target="_blank">
      terms and conditions
    </a>{' '}
    and{' '}
    <a href={`${config.landingURL}/legal/privacy-policy`} target="_blank">
      privacy policy
    </a>
  </p>
)

export default AgreeLabel
