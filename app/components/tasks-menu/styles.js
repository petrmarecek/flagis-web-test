import styled, { keyframes, css } from 'styled-components'

// components
import Icon from 'components/icons/icon'
import MenuBox from 'components/menux-box/menu-box'
import MenuBoxGroupItems from 'components/menux-box/menu-box-group-items'
import MenuBoxItem from 'components/menux-box/menu-box-item'

// styles
import { fadeIn, flipInX, flipOutX } from 'react-animations'
import {
  boxSizing,
  borderRadius,
  transform,
  boxShadow,
  fontMain,
  userSelect,
  animateLineFromMiddle,
} from '../styled-components-mixins/'
import { colors } from 'components/styled-components-mixins/colors'

const fade = keyframes`${fadeIn}`
const TasksMenuItem = styled.div`
  ${boxSizing('border-box')};
  height: 100%;
  width: 40px;
  margin: 0 0 0 10px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: 600ms ${fade};
`

const IconWrapper = styled.div`
  ${boxSizing('border-box')};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  cursor: pointer;

  svg {
    path {
      fill: ${props => props.iconColor};
    }
  }

  :hover {
    svg {
      path {
        fill: ${props => props.hoverIconColor};
      }
    }
  }
`

// ---------------------------------- index ----------------------------------
const TaskMenuWrapper = styled.div`
  height: 38px;
  position: relative;
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const TaskCountIndicator = styled.span`
  height: 100%;
  display: flex;
  align-items: center;
  float: right;
  margin: 0 0 0 5px;
`

const TaskCountIndicatorInner = styled.span`
  ${borderRadius('14px')};
  color: ${colors.aztec};
  background-color: ${props =>
    props.multiSelect ? colors.meltingGlacier : colors.white};
  margin: 0 0 0 5px;
  padding: 0 5px;
  font-size: 14px;
  height: 28px;
  min-width: 28px;
  font-weight: bold;
  line-height: 28px;
  text-align: center;
`

// ---------------------------------- FiltersActive ----------------------------------
const TasksMenuFiltersActive = styled.ul`
  ${boxSizing('border-box')};
  display: flex;
  flex-shrink: 0;
  align-items: center;
  width: auto;
  height: 100%;
  float: right;
  color: ${colors.aztec};
  white-space: nowrap;
`

const flipIn = keyframes`${flipInX}`
const flipOut = keyframes`${flipOutX}`
const FilterActiveItem = styled.li`
  ${borderRadius('15px')};
  display: flex;
  align-items: center;
  list-style-type: none;
  height: 30px;
  text-align: left;
  margin: 0 0 0 15px;
  background-color: ${colors.white};
  padding: 0 10px 0 18px;
  font-size: 14px;
  animation: ${props =>
    props.isMounted
      ? css`
          ${flipIn} 250ms
        `
      : css`
          ${flipOut} 250ms
        `};
`

const FilterActiveItemIconUser = styled.div`
  margin: ${props => (props.isSender ? '0 0 0 5px' : '0 5px 0 0')};

  img {
    object-fit: cover;
  }
`

const FilterActiveItemIconCancel = styled.div`
  margin: 0 0 2px 0;
`

const FilterActiveItemTitle = styled.div`
  font-weight: bold;
  margin: ${props => (props.canAutocomplete ? '0 5px 0 0' : '0 10px 0 0')};
`

const FilterActiveItemAutocomplete = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 2px 0 0 0;
  margin: ${props => (props.isSender ? '0 10px 0 5px' : '0 10px 0 0')};
  border-left: 2px solid ${colors.crystalBell};
  border-right: 2px solid ${colors.crystalBell};
`

// ---------------------------------------- Multiselect ------------------------------------

const MultiSelectWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 14px;
  color: ${colors.lostAtSea};

  .react-datepicker__portal {
    background-color: rgba(62, 72, 79, 0.85);
  }
`

const MultiSelectItem = styled(Icon)`
  margin: 0 8px 0 10px;
`

// ---------------------------------------- MenuBox ----------------------------------------
const MenuBoxContainer = styled(MenuBox)`
  ${borderRadius('5px')}
  ${boxShadow('0px 1px 6px 1px rgba(163,163,163,0.5)')}
  position: absolute;
  right: 0;
  top: 38px;
  z-index: 100;
  border: 1px solid ${colors.bayOfHope};
  background-color: ${colors.white};
  font-size: 14px;
  padding: 20px 15px 0 0;
  animation: 400ms ${fade};

  :before,
  :after {
    content: '';
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
  }

  :before {
    top: -18px;
    right: ${props => props.trianglePosition}px;
    border-color: transparent transparent ${colors.bayOfHope} transparent;
    border-width: 9px;
  }

  :after {
    top: -16px;
    right: calc(${props => props.trianglePosition}px + 1px);
    border-color: transparent transparent ${colors.white} transparent;
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
      color: ${colors.aztec};
    }

    path {
      fill: ${colors.aztec};
    }
  }
`

const MenuBoxItemIcon = styled(MenuBoxItem)`
  display: inline-block;
  margin: 0 11px 0 22px;
  pointer-events: ${props =>
    props.active && !props.canClickAgain ? 'none' : 'auto'};

  path {
    fill: ${props => (props.active ? colors.aztec : colors.lostAtSea)};
  }
`

const MenuBoxItemTitle = styled(MenuBoxItem)`
  ${userSelect('none')};
  display: inline-block;
  cursor: pointer;
  margin: 0 8px;
  padding: 0;
  color: ${props => (props.active ? colors.aztec : colors.lostAtSea)};
  pointer-events: ${props =>
    props.active && !props.canClickAgain ? 'none' : 'auto'};
  ${animateLineFromMiddle(2, 1, colors.darkJungleGreen)};

  :hover {
    :after {
      ${transform(props => (props.active ? 'scaleX(0)' : 'scaleX(1)'))}
    }
  }

  border-bottom: ${props => (props.active ? `1px solid ${colors.aztec}` : '0')};
`

export {
  TaskMenuWrapper,
  TaskCountIndicator,
  TaskCountIndicatorInner,
  TasksMenuItem,
  IconWrapper,
  TasksMenuFiltersActive,
  FilterActiveItem,
  FilterActiveItemIconUser,
  FilterActiveItemIconCancel,
  FilterActiveItemTitle,
  FilterActiveItemAutocomplete,
  MultiSelectWrapper,
  MultiSelectItem,
  MenuBoxContainer,
  MenuBoxGroup,
  MenuBoxItemIcon,
  MenuBoxItemTitle,
}
