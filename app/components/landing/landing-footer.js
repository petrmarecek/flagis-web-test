import React from 'react'
import moment from 'moment'
import { flagisInfo } from 'utils/flagis-info'

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
  FooterTextEmail,
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
        <FooterTextEmail
          onClick={() => window.open(`mailto:${flagisInfo.emails.info}`)}
        >
          {flagisInfo.emails.info}
        </FooterTextEmail>
        <FooterText>{`© ${year} Flagis`}</FooterText>
      </FooterBottom>
    </FooterWrapper>
  )
}

export default LandingFooter
