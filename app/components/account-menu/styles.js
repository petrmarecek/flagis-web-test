import styled from 'styled-components'
import MenuBoxGroupItems from 'components/menux-box/menu-box-group-items'
import MenuBoxItem from 'components/menux-box/menu-box-item'
import { fontMain, userSelect } from '../styled-components-mixins/'

const MenuBoxContainer = styled.div`
  font-size: 15px;
  margin: 45px 28px 0 28px;
`;

const MenuBoxGroup = styled.div`
  padding: 0;
`;

const MenuBoxGroupItem = styled(MenuBoxGroupItems)`
  ${fontMain}
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  
  &:hover {
    span {
      font-weight: bold;
    }

    path {
      fill: #44FFB1;
    }
  }
  
  &:last-of-type {
    margin-bottom: 14px; 
  }
`;

const MenuBoxItemIcon = styled(MenuBoxItem)`
  flex-grow: 3;
  padding: 10px 0 10px 2px;
  cursor: pointer;
  pointer-events: ${props => props.active ? 'none' : 'auto'};

  path {
    fill: ${props => props.active ? '#44FFB1' : '#D7E3EC'};
  }
`;

const MenuBoxItemTitle = styled(MenuBoxItem)`
  ${userSelect('none')};
  flex-grow: 3;
  cursor: pointer;
  width: 100%;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  pointer-events: ${props => props.active ? 'none' : 'auto'};
  padding: 10px 0 10px 15px;
`;

const MenuBoxLine = styled.div`
  border-top: 1px solid #D7E3EC;
  margin-bottom: 14px;
`;

export {
  MenuBoxContainer,
  MenuBoxGroup,
  MenuBoxGroupItem,
  MenuBoxItemIcon,
  MenuBoxItemTitle,
  MenuBoxLine,
}
