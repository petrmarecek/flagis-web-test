import styled, { css } from 'styled-components'
import {
  fontMain,
  boxSizing,
  borderRadius,
  transform,
  transition,
  userSelect,
} from '../styled-components-mixins'
import colors from 'components/styled-components-mixins/colors'

// components
import Icon from 'components/icons/icon'
import Counter from 'components/common/counter'
import MenuBox from 'components/menux-box/menu-box'
import MenuBoxGroupItems from 'components/menux-box/menu-box-group-items'
import MenuBoxItem from 'components/menux-box/menu-box-item'

/*--------------------------------- Common ---------------------------------*/

const TriangleIcon = styled(Icon)`
  margin: 0 5px 0 0;
`

/*---------------------------------- Navigation Primary ----------------------------------*/
const flexColumn = css`
  display: flex;
  flex-direction: column;
`

const NavigationPrimaryWrapper = styled.div`
  ${flexColumn}
  ${transition('height 300ms ease-out')}
  height: ${props => (props.isVisibleMore ? '209px' : '133px')};
  position: relative;
`

const NavigationPrimaryHidden = styled.div`
  ${flexColumn}
`

const PrimaryButton = styled.div`
  ${boxSizing('border-box')}
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

const InboxCounter = styled(Counter)`
  position: absolute;
  right: 30px;
  font-size: 11px;
  background-color: #44ffb1;
  ${borderRadius('10px')}
`

const ShowMoreButton = styled.span`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  bottom: 0;
  color: ${props => colors[props.colorTheme].navigationPrimaryShowMore};
  padding-right: 28px;
  width: 100%;
  cursor: pointer;

  svg {
    ${transition('transform 300ms ease-out')}
    ${transform(props =>
      props.isVisibleMore ? 'rotate(180deg)' : 'rotate(0deg)'
    )}
  }

  :hover {
    color: ${colors.navigationPrimaryShowMoreHover};

    svg {
      path {
        fill: ${colors.navigationPrimaryShowMoreHover};
      }
    }
  }
`

const ShowMoreTitle = styled.div`
  font-size: 12px;
  font-weight: 500;
`

/*------------------------------ Navigation Secondary ----------------------------------*/

const NavigationSecondaryWrapper = styled.div`
  flex: 1;
  display: flex;
  font-size: 14px;
  ${borderRadius('5px')}
`

const SecondaryButton = styled.div`
  ${fontMain}
  ${userSelect('none')};
  display: inline-block;
  cursor: pointer;
  margin: 0 14px 0 0;
  padding: 0;
  color: ${props => (props.active ? '#293034' : '#B1B5B8')};
  pointer-events: ${props => (props.active ? 'none' : 'auto')};

  :after {
    ${transform('scaleX(0)')}
    ${transition('transform 250ms ease-in-out')}
    display: block;
    content: '';
    margin-top: 2px;
    border-bottom: 1px solid #293034;
  }

  :hover {
    color: #293034;

    :after {
      ${transform('scaleX(1)')}
    }
  }

  border-bottom: ${props => (props.active ? '1px solid #293034' : '0')};
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
  ${borderRadius('5px')}
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
    right: 58px;
    border-color: transparent transparent #c1cad0 transparent;
    border-width: 9px;
  }

  :after {
    top: -16px;
    right: 59px;
    border-color: transparent transparent #fff transparent;
    border-width: 8px;
  }
`

const MenuBoxGroup = styled(MenuBoxGroupItems)`
  ${fontMain}
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

  &:after {
    ${transform('scaleX(0)')}
    ${transition('transform 250ms ease-in-out')}
    display: block;
    content: '';
    margin-top: 2px;
    border-bottom: 1px solid #293034;
  }

  &:hover {
    &:after {
      ${transform('scaleX(1)')}
    }
  }

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
  // Navigation Primary
  NavigationPrimaryWrapper,
  NavigationPrimaryHidden,
  PrimaryButton,
  PrimaryButtonText,
  InboxCounter,
  ShowMoreButton,
  ShowMoreTitle,
  // Navigation Secondary
  NavigationSecondaryWrapper,
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
