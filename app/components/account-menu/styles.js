import styled from 'styled-components'
import MenuBoxGroupItems from 'components/menux-box/menu-box-group-items'
import MenuBoxItem from 'components/menux-box/menu-box-item'
import { fontMain, userSelect } from '../common/styled-component-mixins'

const MenuBoxContainer = styled.div`
  font-size: 15px;
  margin: 55px 35px 0 35px;
`;

const MenuBoxGroup = styled(MenuBoxGroupItems)`
  ${fontMain}
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  margin-bottom: 40px;
  
  &:hover {
    span {
      font-weight: bold;
    }

    path {
      fill: #44FFB1;
    }
  }
`;

const MenuBoxItemIcon = styled(MenuBoxItem)`
  margin: 0 11px 0 22px;
  pointer-events: ${props => props.active ? 'none' : 'auto'};

  path {
    fill: ${props => props.active ? '#44FFB1' : '#D7E3EC'};
  }
`;

const MenuBoxItemTitle = styled(MenuBoxItem)`
  ${userSelect('none')};
  cursor: pointer;
  margin: 0 8px;
  padding: 0;
  font-weight: ${props => props.active ? 'bold' : 'none'} ;
  pointer-events: ${props => props.active ? 'none' : 'auto'};
`;

const MenuBoxLine = styled.div`
  border-top: 1px solid #D7E3EC;
  margin-bottom: 40px;
`;

export {
  MenuBoxContainer,
  MenuBoxGroup,
  MenuBoxItemIcon,
  MenuBoxItemTitle,
  MenuBoxLine,
}
