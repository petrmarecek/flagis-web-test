import styled from 'styled-components'
import { boxSizing } from '../styled-components-mixins/'

// ---------------------------------- NavigationBar ----------------------------------
const Navbar = styled.nav`
  ${boxSizing('border-box')}
  background-color: #293034;
  position: fixed;
  height: 60px;
  width: 100%;
  z-index: 500;
  border-bottom: 1px solid #3e484f;
  max-width: none;
`;

const NavbarLeft = styled.div`
  float: left;
`;

const NavbarLogo = styled.span`
  margin: 15px 35px 11px 0;
`;

const NavbarCenter = styled.div`
  position: absolute;
  top: 0;
  left: 175px;
  right: 325px;
  height: 60px;
`;

const NavbarRight = styled.div`
  float: right;
  margin-right: 14px;
`;

// ---------------------------------- NavigationRight ----------------------------------
const NavButtonContainer = styled.div`
  display: flex;
`;

const NavButton = styled.div`
  ${boxSizing('border-box')}
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  cursor: pointer;
  width: 49px;
  margin-left: 15px;
  pointer-events: ${props => props.active ? 'none' : 'auto'};
  border-bottom: ${props => props.active ? '3px solid #43ffb1' : '3px solid #293034'};
  background-color: ${props => props.active ? '#3a434a' : '#293034'};
  
  &:hover {
    background-color: #3a434a;
    border-bottom: 3px solid #43ffb1;
  }
`;

export {
  // NavigationBar
  Navbar,
  NavbarLeft,
  NavbarLogo,
  NavbarCenter,
  NavbarRight,

  // NavigationRight
  NavButtonContainer,
  NavButton,
}
