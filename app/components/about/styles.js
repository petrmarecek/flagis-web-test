// styles
import styled from 'styled-components'
import { fontBold, mediaQueries } from 'components/styled-components-mixins'

/*--------------------------------- Variables ---------------------------------*/

const maxWidth = 792
const maxWidthMd = 692

/*--------------------------------- About ---------------------------------*/

const AboutWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 25px 25px;
  min-height: ${props => props.height - 140}px;
`
const AboutInner = styled.div`
  max-width: ${maxWidth}px;

  ${mediaQueries.md} {
    max-width: ${maxWidthMd}px;
  }
`

const AboutTitle = styled.h1`
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 40px;
  text-align: center;

  ${mediaQueries.smx} {
    font-size: 36px;
  }
`

const AboutLine = styled.div`
  height: 2px;
  width: 50px;
  border: 2px solid ${props => props.theme.COLORS.darkJungleGreen};
  margin: 0 0 30px;

  ${mediaQueries.smx} {
    margin: 0 0 20px;
  }
`

const AboutContent = styled.div`
  font-size: 18px;
  text-align: justify;
  margin: 15px 0;
  line-height: 27px;

  ${mediaQueries.smx} {
    font-size: 16px;
    line-height: 24px;
  }

  p {
    margin: 15px 0;

    ${mediaQueries.smx} {
      margin: 10px 0;
    }
  }

  h4 {
    ${fontBold}
    margin: 0 0 30px;

    ${mediaQueries.smx} {
      margin: 0 0 20px;
    }
  }
`

export {
  // About
  AboutWrapper,
  AboutInner,
  AboutLine,
  AboutTitle,
  AboutContent,
}
