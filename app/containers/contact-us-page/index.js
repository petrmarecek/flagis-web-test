import React from 'react'
import PropTypes from 'prop-types'

// components
import NavigationLandingPrimary from 'components/navigation/navigation-landing-primary'
import styled from 'styled-components'

const AboutUsWrapper = styled.div``
const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0;
`

const Title = styled.div`
  font-size: 60px;
  font-weight: bold;
  margin-bottom: 100px;
`

const Content = styled.div`
  font-size: 32px;
`

const AboutUsPage = ({ location }) => (
  <AboutUsWrapper>
    <NavigationLandingPrimary location={location} />
    <InnerWrapper>
      <Title>Contact Us</Title>
      <Content>comming soon...</Content>
    </InnerWrapper>
  </AboutUsWrapper>
)

AboutUsPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

export default AboutUsPage
