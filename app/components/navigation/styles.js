import styled from 'styled-components'
import {
  fontMain,
  fontBold,
  boxSizing,
  borderRadius,
  transform,
  transition,
  userSelect,
  mediaQueries,
  boxShadow,
  animateLineFromMiddle,
} from '../styled-components-mixins'
import colors, {
  colors as defaultColors,
} from 'components/styled-components-mixins/colors'

// components
import Icon from 'components/icons/icon'
import Counter from 'components/common/counter'
import MenuBox from 'components/menux-box/menu-box'
import MenuBoxGroupItems from 'components/menux-box/menu-box-group-items'
import MenuBoxItem from 'components/menux-box/menu-box-item'

/*--------------------------------- Common ---------------------------------*/

const TriangleIcon = styled(Icon)`
  margin: 0 0 0 5px;
`

/*------------------------------ Navigation Landing Primary -----------------------------*/

const NavigationLandingPrimaryWrapper = styled.nav`
  display: flex;
  align-items: center;
  height: 136px;
  padding: 0 68px;

  ${mediaQueries.smx} {
    height: 100px;
    padding: 0 30px;
  }

  ${mediaQueries.sm} {
    padding: 0 20px;
  }
`

const LandingLogo = styled.div`
  flex: 2;

  img {
    height: auto;
    width: 96px;

    ${mediaQueries.sm} {
      width: 70px;
    }
  }
`

const LandingButtons = styled.div`
  flex: 8;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 18px;

  ${mediaQueries.sm} {
    font-size: 14px;
  }
`

const LandingButtonSignIn = styled.div`
  ${fontMain}
  ${userSelect('none')};
  display: inline-block;
  cursor: pointer;
  padding: 0;
  margin-right: 64px;
  color: ${defaultColors.darkJungleGreen};
  pointer-events: ${props => (props.active ? 'none' : 'auto')};

  a {
    color: ${defaultColors.darkJungleGreen};
  }

  a:hover {
    color: ${defaultColors.freeSpeechBlue};
  }

  ${mediaQueries.smx} {
    margin-right: 20px;
  }
`

const LandingButtonSignUp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 169px;
  font-weight: bold;
  background-color: ${defaultColors.hanumanGreen};
  pointer-events: ${props => (props.active ? 'none' : 'auto')};
  ${borderRadius('100px')}

  a {
    color: ${defaultColors.white};
  }

  :hover {
    background-color: ${defaultColors.freeSpeechBlue};
  }

  ${mediaQueries.sm} {
    height: 30px;
    width: 130px;
  }
`

/*------------------------------ Navigation Landing Secondary -----------------------------*/

const NavigationLandingSecondaryWrapper = styled.div`
  flex: 1;
  display: flex;
`

/*------------------------------ Navigation Legal -----------------------------*/

const NavigationLegalWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 25px;

  ${mediaQueries.smx} {
    flex-direction: column;
  }
`

const LegalButton = styled.div`
  ${props => (props.active ? fontBold : fontMain)}
  ${userSelect('none')};
  display: inline-block;
  cursor: pointer;
  font-size: 20px;
  margin: 0 50px 0 0;
  padding: 0;
  color: ${defaultColors.darkJungleGreen};
  pointer-events: ${props => (props.active ? 'none' : 'auto')};
  width: max-content;
  ${animateLineFromMiddle(2, 2, defaultColors.darkJungleGreen)}

  :last-of-type {
    margin: 0;

    ${mediaQueries.smx} {
      margin: 5px 0;
    }
  }

  ${mediaQueries.md} {
    margin: 0 25px 0 0;
  }

  ${mediaQueries.smx} {
    font-size: 16px;
    margin: 5px 0;
  }
`

/*---------------------------------- Navigation Primary ----------------------------------*/

const NavigationPrimaryWrapper = styled.div`
  ${transition('height 300ms ease-out')};
  display: flex;
  flex-direction: column;
  position: relative;
`

const PrimaryButton = styled.div`
  ${boxSizing('border-box')};
  display: flex;
  align-items: center;
  position: relative;
  height: 38px;
  width: 100%;
  cursor: pointer;
  padding: 0 20px 0 27px;
  border-style: solid;
  color: ${props =>
    props.active
      ? colors[props.colorTheme].navigationPrimaryHover
      : colors[props.colorTheme].navigationPrimary};
  border-width: ${props => (props.active ? '1px 0 1px 3px' : '0 0 0 3px')};
  border-color: ${props =>
    props.active
      ? `rgba(151, 151, 151, 0.2)  ${colors.navigationPrimaryBorderHover}`
      : colors[props.colorTheme].navigationPrimaryBorder};

  svg {
    path {
      fill: ${props =>
        props.active
          ? colors[props.colorTheme].navigationPrimaryHover
          : colors[props.colorTheme].navigationPrimary};
    }
  }

  :hover {
    color: ${props => colors[props.colorTheme].navigationPrimaryHover};
    border-width: ${props => (props.active ? '1px 0 1px 3px' : '0 0 0 3px')};
    border-color: rgba(151, 151, 151, 0.2)
      ${colors.navigationPrimaryBorderHover};

    svg {
      path {
        fill: ${props => colors[props.colorTheme].navigationPrimaryHover};
      }
    }
  }
`

const PrimaryButtonText = styled.div`
  margin-left: 20px;
  font-size: 14px;
`

/*------------------------------ Navigation Secondary ----------------------------------*/

const NavigationSecondaryWrapper = styled.div`
  flex: 1;
  display: flex;
  position: relative;
`

const SecondaryButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 2px;
  height: 26px;
  ${borderRadius('13px')};
  background-color: ${defaultColors.coldWind};
`

const SecondaryButton = styled.div`
  ${fontMain};
  ${userSelect('none')};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  height: 22px;
  width: 115px;
  ${borderRadius('11px')};
  ${props => (props.active ? boxShadow('0 2px 4px 0 #CECECE') : null)};
  background-color: ${props =>
    props.active ? defaultColors.white : 'transparent'};
  pointer-events: ${props => (props.active ? 'none' : 'auto')};

  :hover {
    font-weight: bold;
  }
`

/*------------------------------ Navigation Default -----------------------------*/

const NavigationDefaultWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 20px 0 30px;
`

const AccountWrapper = styled.div`
  cursor: pointer;
  margin-left: 20px;

  img {
    object-fit: cover;
  }

  svg:nth-of-type(1) {
    ${transition('transform 300ms ease-out')}
    ${transform(props =>
      props.isVisibleAccountNavigation ? 'rotate(180deg)' : 'rotate(0deg)'
    )}
  }

  :hover {
    svg:nth-of-type(1) {
      path {
        fill: ${colors.navigationDefaultTriangleHover};
      }
    }
  }
`

const AccountNotificationsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
`

const NotificationsWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 60px;
  margin-left: 20px;
`

const NotificationsCounter = styled(Counter)`
  position: absolute;
  right: -8px;
  top: 12px;
  font-size: 11px;
  background-color: #44ffb1;
  ${borderRadius('10px')}
`

/*------------------------------ Navigation Account ----------------------------------*/
const MenuBoxWrapper = styled(MenuBox)`
  ${borderRadius('5px')};
  position: absolute;
  right: 5px;
  top: 60px;
  z-index: 100;
  border: 1px solid #c1cad0;
  background-color: #fff;
  font-size: 14px;
  color: #616f78;
  padding: 20px 15px 0 0;

  :before,
  :after {
    content: '';
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    z-index: 10000;
  }

  :before {
    top: -18px;
    right: 36px;
    border-color: transparent transparent #c1cad0 transparent;
    border-width: 9px;
  }

  :after {
    top: -16px;
    right: 37px;
    border-color: transparent transparent #fff transparent;
    border-width: 8px;
  }
`

const MenuBoxGroup = styled(MenuBoxGroupItems)`
  ${fontMain};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  margin-bottom: 20px;

  span {
    margin: 0 0 6px 0;
  }

  &:hover {
    span {
      color: #293034;
    }

    path {
      fill: #293034;
    }
  }
`

const MenuBoxItemIcon = styled(MenuBoxItem)`
  display: inline-block;
  margin: 0 11px 0 22px;
  pointer-events: ${props => (props.active ? 'none' : 'auto')};

  path {
    fill: ${props => (props.active ? '#293034' : '#8C9DA9')};
  }
`

const MenuBoxItemTitle = styled(MenuBoxItem)`
  ${userSelect('none')};
  display: inline-block;
  cursor: pointer;
  margin: 0 8px;
  padding: 0;
  color: ${props => (props.active ? '#293034' : '#8C9DA9')};
  pointer-events: ${props => (props.active ? 'none' : 'auto')};
  ${animateLineFromMiddle(2, 1, defaultColors.darkJungleGreen)};

  border-bottom: ${props => (props.active ? '1px solid #293034' : '0')};
`

/*------------------------------ Navigation Account Settings ----------------------------------*/

const NavigationAccountSettingsWrapper = styled.div`
  display: flex;
  font-size: 16px;
  margin-left: 17px;
  height: 100%;
`

const SettingsButton = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 0 5px 5px 5px;
  margin-right: 34px;
  cursor: pointer;
  color: ${props => (props.active ? '#1C2124' : '#B1B5B8')};
  border-bottom: ${props =>
    props.active ? '3px solid #44FFB1' : '3px solid #fff'};

  :hover {
    color: #1c2124;
    border-bottom: 3px solid #44ffb1;
  }
`

export {
  // Common
  TriangleIcon,
  // Navigation Landing Primary
  NavigationLandingPrimaryWrapper,
  LandingLogo,
  LandingButtons,
  LandingButtonSignIn,
  LandingButtonSignUp,
  //Navigation Landing Secondary
  NavigationLandingSecondaryWrapper,
  // Navigation Legal
  NavigationLegalWrapper,
  LegalButton,
  // Navigation Primary
  NavigationPrimaryWrapper,
  PrimaryButton,
  PrimaryButtonText,
  // Navigation Secondary
  NavigationSecondaryWrapper,
  SecondaryButtonsWrapper,
  SecondaryButton,
  // Navigation Default
  NavigationDefaultWrapper,
  AccountWrapper,
  AccountNotificationsWrapper,
  NotificationsWrapper,
  NotificationsCounter,
  // Navigation Account
  MenuBoxWrapper,
  MenuBoxGroup,
  MenuBoxItemIcon,
  MenuBoxItemTitle,
  // Navigation account settings
  NavigationAccountSettingsWrapper,
  SettingsButton,
}
