import React from 'react'
import moment from 'moment'

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
  FooterText,
} from './styles'

const LandingFooter = () => {
  const { innerHeight } = window
  const year = moment().year()
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
        <FooterText>info@flagis.com</FooterText>
        <FooterText>{`© ${year} Flagis`}</FooterText>
      </FooterBottom>
    </FooterWrapper>
  )
}

export default LandingFooter
