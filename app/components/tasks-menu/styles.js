import styled from 'styled-components'
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
  userSelect
} from '../styled-components-mixins/'

const TasksMenuItem = styled.div`
  ${boxSizing('border-box')}
  height: 100%;
  width: 40px;
  margin: 0 0 0 10px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// ---------------------------------- TasksMenuNavigation ----------------------------------
const NavigationContainer = styled.div`
  display: flex;
  ${borderRadius('5px')}
  margin-top: 3px;
`;

const Button = styled.div`
  ${boxSizing('border-box')}
  ${borderRadius(props => props.radius ? props.radius : '0')}
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  cursor: pointer;
  width: 35px;
  border-width: ${props => props.first ? '1px' : '1px 1px 1px 0'};
  border-style: solid;
  border-color: ${props => props.active ? '#8C9DA9' : '#C1CAD0'};
  pointer-events: ${props => props.active ? 'none' : 'auto'};
  background-color: ${props => props.active ? '#8C9DA9' : '#E7ECED'};
  
  &:hover {
    background-color: #8C9DA9;
    border: 1px solid #8C9DA9;
    
    svg {
      path {
        fill: #fff;
      }
    }
  }
`;

// ---------------------------------------- MenuBox ----------------------------------------
const MenuBoxContainer = styled(MenuBox)`
  ${borderRadius('5px')}
  ${boxShadow('0px 1px 6px 1px rgba(163,163,163,0.5)')}
  position: absolute;
  right: 10px;
  top: 48px;
  z-index: 100;
  border: 1px solid #C1CAD0;
  background-color: #fff;
  font-size: 14px;
  color: #616F78;
  padding: 20px 15px 0 0;
  
  :before, :after {
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
    border-color: transparent transparent #C1CAD0 transparent;
    border-width: 9px;
  }
  
  :after {
    top: -16px;
    right: calc(${props => props.trianglePosition}px + 1px);
    border-color: transparent transparent #fff transparent;
    border-width: 8px;
  }
`;

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
`;

const MenuBoxItemIcon = styled(MenuBoxItem)`
  display: inline-block;
  margin: 0 11px 0 22px;
  pointer-events: ${props => props.active ? 'none' : 'auto'};

  path {
    fill: ${props => props.active ? '#282f34' : '#8c9ea9'};
  }
`;

const MenuBoxItemTitle = styled(MenuBoxItem)`
  ${userSelect('none')};
  display: inline-block;
  cursor: pointer;
  margin: 0 8px;
  padding: 0;
  color: ${props => props.active ? '#293034' : '#8c9ea9'} ;
  pointer-events: ${props => props.active ? 'none' : 'auto'};

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
  
  border-bottom: ${props => props.active ? '1px solid #293034' : '0'}
`;

export {
  TasksMenuItem,
  NavigationContainer,
  Button,
  MenuBoxContainer,
  MenuBoxGroup,
  MenuBoxItemIcon,
  MenuBoxItemTitle,
}
