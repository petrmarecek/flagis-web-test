import styled, { keyframes } from 'styled-components'
import { fadeIn, flipInX, flipOutX } from 'react-animations'
import MenuBox from 'components/menux-box/menu-box'
import MenuBoxGroupItems from 'components/menux-box/menu-box-group-items'
import MenuBoxItem from 'components/menux-box/menu-box-item'
import {
  boxSizing,
  transition,
  borderRadius,
  boxShadow,
  fontMain,
  transform,
  userSelect,
} from '../styled-components-mixins/'

const fade = keyframes`${fadeIn}`
const TasksMenuItem = styled.div`
  ${boxSizing('border-box')}
  height: 100%;
  width: 40px;
  margin: 0 0 0 10px;
  flex-shrink: 0;
  animation: 600ms ${fade};
`

const IconWrapper = styled.div`
  ${boxSizing('border-box')}
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

// ---------------------------------- TasksMenuFiltersActive ----------------------------------
const TasksMenuFiltersActive = styled.ul`
  ${boxSizing('border-box')}
  display: flex;
  flex-shrink: 0;
  align-items: center;
  width: auto;
  height: 100%;
  float: right;
  color: #293034;
  white-space: nowrap;
`

const flipIn = keyframes`${flipInX}`
const flipOut = keyframes`${flipOutX}`
const FilterActiveItem = styled.li`
  ${borderRadius('15px')}
  display: flex;
  align-items: center;
  list-style-type: none;
  height: 30px;
  text-align: left;
  margin: 0 0 0 15px;
  background-color: #fff;
  padding: 0 10px 0 18px;
  font-size: 14px;
  animation: ${props =>
    props.isMounted ? `${flipIn} 500ms` : `${flipOut} 500ms`};
`
const FilterActiveItemIcon = styled.div`
  ${borderRadius('15px')}
  width: auto;
`

const FilterActiveItemTitle = styled.div`
  font-weight: bold;
  margin: ${props => (props.isAssignee ? '0 10px 2px 10px' : '0 10px 2px 0')};
`

const FilterActiveItemAutocomplete = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0 0 6px 0;
  margin: 0 10px 0 0;
  border-left: 2px solid #e7eced;
  border-right: 2px solid #e7eced;
`

// ---------------------------------------- MenuBox ----------------------------------------
const MenuBoxContainer = styled(MenuBox)`
  ${borderRadius('5px')}
  ${boxShadow('0px 1px 6px 1px rgba(163,163,163,0.5)')}
  position: absolute;
  right: 0;
  top: 48px;
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
  }

  :before {
    top: -18px;
    right: ${props => props.trianglePosition}px;
    border-color: transparent transparent #c1cad0 transparent;
    border-width: 9px;
  }

  :after {
    top: -16px;
    right: calc(${props => props.trianglePosition}px + 1px);
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

export {
  TasksMenuItem,
  IconWrapper,
  TasksMenuFiltersActive,
  FilterActiveItem,
  FilterActiveItemIcon,
  FilterActiveItemTitle,
  FilterActiveItemAutocomplete,
  MenuBoxContainer,
  MenuBoxGroup,
  MenuBoxItemIcon,
  MenuBoxItemTitle,
}
