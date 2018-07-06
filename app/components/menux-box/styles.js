import styled from 'styled-components'
import { userSelect, transition, transform, fontMain } from '../common/styled-component-mixins'

const MenuBoxContainer = styled.div`
  position: absolute;
  right: -10px;
  top: 48px;
  z-index: 100;
  border-color: #282f34 #8c9ea9 #8c9ea9;
  border-style: solid;
  border-width: 2px 1px 1px;
  background-color: #e7eced;
  font-size: 14px;
  color: #8c9ea9;
  padding: 20px 15px 0 0;
`;

const MenuBoxGroup = styled.div`
  ${fontMain}
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  margin-bottom: 20px;
  
  &:hover {
    span {
      color: #293034;
    }

    path {
      fill: #282f34;
    }
  }
`;

const MenuBoxItemIcon = styled.div`
  display: inline-block;
  margin: 0 11px 0 22px;
  pointer-events: ${props => props.active ? 'none' : 'auto'};

  path {
    fill: ${props => props.active ? '#282f34' : '#8c9ea9'};
  }
`;

const MenuBoxItemTitle = styled.span`
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
  MenuBoxContainer,
  MenuBoxGroup,
  MenuBoxItemIcon,
  MenuBoxItemTitle,
}
