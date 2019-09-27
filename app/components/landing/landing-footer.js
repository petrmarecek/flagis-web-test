import React from 'react'

// components
import { Link } from 'react-router-dom'
import NavigationLandingSecondary from 'components/navigation/navigation-landing-secondary'

// styles
import {
  FooterWrapper,
  FooterTop,
  FooterTitle,
  FooterButtons,
  FooterBottom,
  FooterCopyright,
} from './styles'

const LandingFooter = () => {
  const { innerHeight } = window
  return (
    <FooterWrapper height={innerHeight}>
      <FooterTop>
        <FooterTitle>
          <Link to="/sign-up">
            Sign Up For <span>FREE</span>
          </Link>
        </FooterTitle>
        <FooterButtons />
      </FooterTop>
      <FooterBottom>
        <NavigationLandingSecondary />
        <FooterCopyright>© 2019 Flagis</FooterCopyright>
      </FooterBottom>
    </FooterWrapper>
  )
}

export default LandingFooter
