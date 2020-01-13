import styled from 'styled-components'
import { fontBold, mediaQueries } from 'components/styled-components-mixins'
import { colors } from 'components/styled-components-mixins/colors'

/*--------------------------------- Variables ---------------------------------*/

const maxWidth = 792
const maxWidthMd = 692

/*--------------------------------- Legal ---------------------------------*/
const LegalWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 25px 25px;
  text-align: justify;
  font-size: 18px;
  line-height: 27px;

  ${mediaQueries.smx} {
    font-size: 16px;
    line-height: 24px;
  }

  h1 {
    ${fontBold}
    font-size: 26px;
    margin: 30px 0 25px 0;

    ${mediaQueries.smx} {
      font-size: 24px;
      margin: 25px 0 20px 0;
    }
  }

  h2 {
    ${fontBold}
    font-size: 24px;
    margin: 25px 0 20px 0;

    ${mediaQueries.smx} {
      font-size: 22px;
      margin: 22px 0 18px 0;
    }
  }

  h3 {
    ${fontBold}
    font-size: 22px;
    margin: 22px 0 18px 0;

    ${mediaQueries.smx} {
      font-size: 20px;
      margin: 20px 0 15px 0;
    }
  }

  h4 {
    ${fontBold}
    margin: 20px 0 15px 0;

    ${mediaQueries.smx} {
      margin: 18px 0 12px 0;
    }
  }

  p {
    margin: 15px 0;

    ${mediaQueries.smx} {
      margin: 10px 0;
    }
  }

  a {
    color: ${colors.pervenche};

    :hover {
      text-decoration: underline;
    }
  }

  ul {
    margin-left: 30px;
    list-style-type: disc;

    li {
      margin: 10px 0;
    }
  }
`

/*--------------------------------- Terms and Conditions ---------------------------------*/

const TermsConditionsWrapper = styled.div`
  max-width: ${maxWidth}px;

  ${mediaQueries.md} {
    max-width: ${maxWidthMd}px;
  }
`

/*--------------------------------- Privacy Policy ---------------------------------*/

const PrivacyPolicyWrapper = styled.div`
  max-width: ${maxWidth}px;

  ${mediaQueries.md} {
    max-width: ${maxWidthMd}px;
  }
`

/*--------------------------------- Cookies Policy ---------------------------------*/

const CookiesPolicyWrapper = styled.div`
  max-width: ${maxWidth}px;

  ${mediaQueries.md} {
    max-width: ${maxWidthMd}px;
  }
`

/*--------------------------------- Eula ---------------------------------*/

const EulaWrapper = styled.div`
  max-width: ${maxWidth}px;

  ${mediaQueries.md} {
    max-width: ${maxWidthMd}px;
  }
`

/*--------------------------------- Disclaimer ---------------------------------*/

const DisclaimerWrapper = styled.div`
  max-width: ${maxWidth}px;

  ${mediaQueries.md} {
    max-width: ${maxWidthMd}px;
  }
`

export {
  // legal
  LegalWrapper,
  // Terms and Conditions
  TermsConditionsWrapper,
  // Privacy Policy
  PrivacyPolicyWrapper,
  // Cookies Policy
  CookiesPolicyWrapper,
  // Eula
  EulaWrapper,
  // Disclaimer
  DisclaimerWrapper,
}
