import styled, { css } from 'styled-components'
import {
  fontMain,
  boxSizing,
  borderRadius,
  transform,
  transition,
  userSelect,
} from '../styled-components-mixins'

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
  margin-bottom: 20px;
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
  color: ${props => (props.active ? 'white' : '#676D71')};
  border-width: ${props => (props.active ? '1px 0 1px 3px' : '0 0 0 3px')};
  border-color: ${props =>
    props.active ? 'rgba(151, 151, 151, 0.2) #43ffb1' : '#1C2124'};

  :hover {
    color: white;
    border-width: 1px 0 1px 3px;
    border-color: rgba(151, 151, 151, 0.2) #43ffb1;

    svg {
      path {
        fill: white;
      }
    }
  }
`

const PrimaryButtonText = styled.div`
  margin-left: 20px;
  font-size: 16px;
`

const InboxCounter = styled(Counter)`
  position: absolute;
  right: 30px;
`

const ShowMoreButton = styled.span`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  bottom: 0;
  color: #41474b;
  padding-right: 20px;
  width: 100%;
  cursor: pointer;

  svg {
    ${transition('transform 300ms ease-out')}
    ${transform(props =>
      props.isVisibleMore ? 'rotate(180deg)' : 'rotate(0deg)'
    )}
  }

  :hover {
    color: #676d71;

    svg {
      path {
        fill: #676d71;
      }
    }
  }
`

const ShowMoreTitle = styled.div`
  font-size: 14px;
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

  svg:nth-of-type(1) {
    ${transition('transform 300ms ease-out')}
    ${transform(props =>
      props.isVisibleAccountNavigation ? 'rotate(180deg)' : 'rotate(0deg)'
    )}
  }

  :hover {
    svg:nth-of-type(1) {
      path {
        fill: #676d71;
      }
    }
  }
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
    right: 20px;
    border-color: transparent transparent #c1cad0 transparent;
    border-width: 9px;
  }

  :after {
    top: -16px;
    right: 21px;
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
      fill: #282f34;
    }
  }
`

const MenuBoxItemIcon = styled(MenuBoxItem)`
  display: inline-block;
  margin: 0 11px 0 22px;
  pointer-events: ${props => (props.active ? 'none' : 'auto')};

  path {
    fill: ${props => (props.active ? '#282f34' : '#8c9ea9')};
  }
`

const MenuBoxItemTitle = styled(MenuBoxItem)`
  ${userSelect('none')};
  display: inline-block;
  cursor: pointer;
  margin: 0 8px;
  padding: 0;
  color: ${props => (props.active ? '#293034' : '#8c9ea9')};
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
  // Navigation Account
  MenuBoxWrapper,
  MenuBoxGroup,
  MenuBoxItemIcon,
  MenuBoxItemTitle,
}
