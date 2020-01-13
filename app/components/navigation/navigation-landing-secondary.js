import React from 'react'
import { Link } from 'react-router-dom'

// styles
import {
  NavigationLandingSecondaryWrapper,
  LandingSecondaryButton,
} from './styles'

const NavigationLandingSecondary = () => (
  <NavigationLandingSecondaryWrapper>
    <LandingSecondaryButton>
      <Link to="/legal/terms-conditions">Legal</Link>
    </LandingSecondaryButton>
    <LandingSecondaryButton>
      <Link to="/about">About</Link>
    </LandingSecondaryButton>
    <LandingSecondaryButton>
      <Link to="/contact-us">Contact Us</Link>
    </LandingSecondaryButton>
  </NavigationLandingSecondaryWrapper>
)

export default NavigationLandingSecondary
