import styled, { keyframes } from 'styled-components'
import { colors } from '../styled-components-mixins/colors'
import {
  mediaQueries,
  fontMain,
  userSelect,
  transform,
  transition,
} from '../styled-components-mixins'
import StoreButtons from 'components/common/store-buttons'
import { fadeIn } from 'react-animations'

// ------------------------------------ Animations --------------------------------------

const show = keyframes`${fadeIn}`

// ------------------------------------ Landing -----------------------------------------

const LandingWrapper = styled.div`
  max-width: 1920px;
  margin: auto;
  padding: 0;
`

// ------------------------------------ Mobile Ledge ------------------------------------

const MobileLedge = styled.div`
  display: flex;
  justify-content: center;
  height: auto;
  padding: 10px 10px;
  background-color: ${colors.crystalBell};
`

const MobileLedgeLogo = styled.div`
  flex: 1;
`

const MobileLedgeLogoBorder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: ${colors.white};
`

const MobileLedgeTitle = styled.div`
  flex: 6;
  font-size: 18px;
  margin: 8px 0 0 20px;

  @media (max-width: 350px) {
    font-size: 16px;
    margin: 10px 0 0 10px;
  }
`

const MobileLedgeStoreLink = styled.div`
  flex: 3;
  font-size: 20px;
  text-align: right;
  margin: 6px 10px 0 0;

  @media (max-width: 350px) {
    text-align: right;
    margin: 8px 10px 0 0;
    font-size: 18px;
  }
`

// ------------------------------------ Section Main ------------------------------------

const SectionMainWrapper = styled.section`
  display: flex;
  position: relative;
  height: ${props => props.height - 140}px;
  padding: 30px 200px 0 200px;

  ${mediaQueries.lg} {
    padding: 30px 150px 0 150px;
  }

  ${mediaQueries.md} {
    padding: 30px 100px 0 100px;
  }

  ${mediaQueries.smx} {
    flex-direction: column;
    padding: 30px 50px 50px;
  }

  ${mediaQueries.sm} {
    padding: 25px;
  }
`

const SectionMainBackground = styled.div`
  position: absolute;
  height: 500px;
  bottom: -500px;
  left: 0;
  right: 0;
  background-color: #f9f9f9;
  transform: skewY(-9deg);
  transform-origin: top left;
  z-index: -1;

  ${mediaQueries.xl} {
    transform: skewY(-10deg);
  }

  ${mediaQueries.xl} {
    transform: skewY(-12deg);
  }

  ${mediaQueries.md} {
    transform: skewY(-18deg);
  }
`

const SectionMainLeft = styled.div`
  flex: 2;

  ${mediaQueries.smx} {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ${mediaQueries.sm} {
    flex-direction: column;
  }
`

const SectionMainLeftTop = styled.div`
  margin-top: 125px;

  ${mediaQueries.xl} {
    margin-top: 100px;
  }

  ${mediaQueries.lgx} {
    margin-top: 80px;
  }

  ${mediaQueries.smx} {
    margin-top: 0;
  }
`

const SectionMainTitle = styled.div`
  ${mediaQueries.smx} {
    font-size: 38px;
    line-height: 46px;
  }

  p {
    font-size: 66px;
    line-height: 74px;

    ${mediaQueries.lgx} {
      font-size: 56px;
      line-height: 62px;
    }

    ${mediaQueries.lg} {
      font-size: 46px;
      line-height: 52px;
    }

    ${mediaQueries.md} {
      font-size: 38px;
      line-height: 46px;
    }

    ${mediaQueries.smx} {
      font-size: 46px;
      line-height: 52px;
    }

    ${mediaQueries.sm} {
      font-size: 28px;
      line-height: 36px;
      text-align: center;
    }

    span {
      font-weight: bold;
    }
  }
`

const SectionMainLeftBottom = styled.div`
  margin-top: 80px;

  ${mediaQueries.md} {
    margin-top: 50px;
  }

  ${mediaQueries.smx} {
    margin-top: 0;
  }

  ${mediaQueries.sm} {
    margin-top: 15px;
  }
`

const SectionMainButtons = styled(StoreButtons)`
  display: flex;
  margin-left: -5px;

  img {
    cursor: pointer;
    width: 167px;
    margin-right: 20px;

    ${mediaQueries.lg} {
      margin-right: 10px;
    }

    ${mediaQueries.md} {
      width: 145px;
    }

    ${mediaQueries.sm} {
      width: 130px;
      margin-right: 0;
    }
  }

  ${mediaQueries.md} {
    margin-left: -10px;
  }

  ${mediaQueries.smx} {
    flex-direction: column;
    margin-left: 20px;
  }

  ${mediaQueries.sm} {
    flex-direction: row;
    margin-top: 15px;
  }
`

const SectionMainRight = styled.div`
  flex: 3;

  img {
    max-width: 100%;
  }

  ${mediaQueries.smx} {
    flex: 4;
    margin-top: 30px;
  }

  ${mediaQueries.sm} {
    margin-top: 30px;
  }
`

// ------------------------------------ Section -----------------------------------------

const SectionWrapper = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: ${props => props.height}px;
  padding: 0 200px;
  background: linear-gradient(180deg, #f9f9f9 34.44%, #ffffff 64.58%);

  ${mediaQueries.lg} {
    padding: 0 150px;
  }

  ${mediaQueries.md} {
    padding: 0 100px;
  }

  ${mediaQueries.smx} {
    padding: 0 50px;
  }

  ${mediaQueries.sm} {
    padding: 25px;
  }
`

const SectionTop = styled.div`
  display: flex;
  height: 300px;

  ${mediaQueries.mdx} {
    height: 280px;
  }

  ${mediaQueries.md} {
    height: 250px;
  }

  ${mediaQueries.sm} {
    flex-direction: column;
    height: 450px;
  }
`

const SectionLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-right: 40px;

  ${mediaQueries.mdx} {
    margin-right: 30px;
  }

  ${mediaQueries.md} {
    margin-right: 20px;
  }

  ${mediaQueries.sm} {
    margin: 0 0 20px 0;
  }
`

const SectionLeftTop = styled.div`
  flex: 2;
`

const SectionTitle = styled.h1`
  font-size: 38px;
  font-weight: bold;

  ${mediaQueries.mdx} {
    font-size: 32px;
  }

  ${mediaQueries.md} {
    font-size: 28px;
  }
`

const SectionLeftMiddle = styled.div`
  flex: 5;
`

const SectionDescription = styled.p`
  font-size: 24px;
  line-height: 34px;

  span {
    font-weight: bold;
    :first-child {
      color: ${colors.hanumanGreen};
    }

    :last-child {
      color: ${colors.pompelmo};
    }
  }

  ${mediaQueries.mdx} {
    font-size: 20px;
    line-height: 28px;
  }

  ${mediaQueries.md} {
    font-size: 18px;
    line-height: 24px;
  }
`

const SectionLeftBottom = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
`

const SectionButton = styled.div`
  span {
    ${fontMain}
    ${userSelect('none')};
    display: inline-block;
    font-size: 20px;
    font-weight: 600;
    color: ${colors.darkJungleGreen};
    cursor: pointer;

    :after {
      ${transform('scaleX(0)')}
      ${transition('transform 250ms ease-in-out')}
      display: block;
      content: '';
      margin-top: 2px;
      border-bottom: 2px solid #293034;
    }

    :hover {
      color: #293034;

      :after {
        ${transform('scaleX(1)')}
      }
    }

    ${mediaQueries.mdx} {
      font-size: 18px;
    }

    ${mediaQueries.md} {
      font-size: 16px;
    }
  }
`

const SectionRight = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 60%;

    ${mediaQueries.lgx} {
      width: 100%;
    }
  }
`

const SectionBottom = styled.div`
  display: flex;
  justify-content: space-between;
`

// ------------------------------------ Section Collapse --------------------------------

const SectionCollapseWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  animation: 800ms linear ${show};

  :first-child {
    margin-right: 40px;

    ${mediaQueries.mdx} {
      margin-right: 30px;
    }

    ${mediaQueries.md} {
      margin-right: 20px;
    }
  }
`

const SectionCollapseTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;

  ${mediaQueries.mdx} {
    font-size: 20px;
  }
`

const SectionCollapseDescription = styled.div`
  font-size: 16px;
  line-height: 22px;

  ${mediaQueries.mdx} {
    font-size: 14px;
    line-height: 20px;
  }

  p {
    margin-top: 15px;
  }

  span {
    font-weight: bold;
  }
`

// ------------------------------------ Footer ------------------------------------------

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  padding: 100px 200px 60px 200px;
  background: #f9f9f9;

  ${mediaQueries.lg} {
    padding: 75px 150px 45px 150px;
  }

  ${mediaQueries.md} {
    padding: 50px 100px 40px 100px;
  }

  ${mediaQueries.smx} {
    flex-direction: column;
    padding: 30px 50px 20px 50px;
  }

  ${mediaQueries.sm} {
    padding: 25px;
  }
`

const FooterTop = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${mediaQueries.sm} {
    flex-direction: column;
  }
`

const FooterTitle = styled.div`
  ${fontMain}
  ${userSelect('none')};
  display: inline-block;
  font-size: 56px;
  color: ${colors.darkJungleGreen};
  cursor: pointer;

  :after {
    ${transform('scaleX(0)')}
    ${transition('transform 250ms ease-in-out')}
    display: block;
    content: '';
    margin-top: 6px;
    border-bottom: 3px solid #293034;
  }

  :hover {
    color: #293034;

    :after {
      ${transform('scaleX(1)')}
    }
  }

  span {
    font-weight: bold;
  }

  ${mediaQueries.mdx} {
    font-size: 46px;
  }

  ${mediaQueries.md} {
    font-size: 32px;
  }

  ${mediaQueries.smx} {
    font-size: 24px;
  }

  ${mediaQueries.sm} {
    font-size: 28px;
  }
`

const FooterButtons = styled(StoreButtons)`
  display: flex;

  img {
    cursor: pointer;
    width: 180px;
    margin: 0 -5px 0 20px;

    ${mediaQueries.mdx} {
      width: 155px;
    }

    ${mediaQueries.md} {
      width: 145px;
    }

    ${mediaQueries.smx} {
      width: 110px;
    }

    ${mediaQueries.sm} {
      width: 110px;
      margin: 5px 0 0 0;
    }
  }
`

const FooterBottom = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 100px;

  ${mediaQueries.sm} {
    flex-direction: column;
    margin-top: 25px;
    align-items: center;
  }
`

const FooterCopyright = styled.p`
  font-size: 20px;
  font-weight: 600;

  ${mediaQueries.smx} {
    font-size: 16px;
  }

  ${mediaQueries.smx} {
    margin-top: 5px;
  }
`

export {
  // Landing
  LandingWrapper,
  // Mobile ledge
  MobileLedge,
  MobileLedgeLogo,
  MobileLedgeLogoBorder,
  MobileLedgeTitle,
  MobileLedgeStoreLink,
  // Section main
  SectionMainWrapper,
  SectionMainBackground,
  SectionMainLeft,
  SectionMainLeftTop,
  SectionMainTitle,
  SectionMainLeftBottom,
  SectionMainButtons,
  SectionMainRight,
  // Section
  SectionWrapper,
  SectionTop,
  SectionLeft,
  SectionLeftTop,
  SectionTitle,
  SectionLeftMiddle,
  SectionDescription,
  SectionLeftBottom,
  SectionButton,
  SectionRight,
  SectionBottom,
  // Section Collapse
  SectionCollapseWrapper,
  SectionCollapseTitle,
  SectionCollapseDescription,
  // Footer
  FooterWrapper,
  FooterTop,
  FooterTitle,
  FooterButtons,
  FooterBottom,
  FooterCopyright,
}
