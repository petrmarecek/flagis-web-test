import styled, { css } from 'styled-components'
import { textOverflow } from '../styled-components-mixins'

const HintsContainer = styled.ul`
  position: absolute;
  left: ${props => props.position.left ? `${props.position.left}px` : '0'};
  top: ${props => `${props.position.top}px`};
  bottom: ${props => `${props.position.bottom}px`};
  z-index: 9999;
  background-color: white;
  overflow: hidden;
  min-width: 180px;
  font-size: 15px;
  border: 1px solid #D7E3EC;
  color: #293034;
`;

const rowHeader = css`
  background-color: #fff;
  font-size: 15px;
  border-width: ${props => props.directionRender === 'topToBottom'
    ? '0 0 1px 0'
    : '1px 0 0 0'
  };
  border-style: solid;
`

const Buttons = styled.li`
  ${rowHeader}
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  border-color: #D7E3EC;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const Button = styled.div`
  flex: 1;
  cursor: pointer;
  display: flex;
  justify-content: center;
  border-right: ${props => props.first ? '1px solid #D7E3EC' : 'none'};

  :hover {
    font-weight: bold;
  }
`;

const Title = styled.li`
  ${rowHeader}
  display: block;
  height: 30px;
  line-height: 30px;
  margin: ${props => props.isFilterContacts ? '10px 5px 0 5px' : '0 5px' };
  padding: 0 5px;
  border-color: #44FFB1;
  color: #C1CAD0;
`;

const Hint = styled.li`
  ${textOverflow('ellipsis')};
  display: block;
  height: auto;
  line-height: 16px;
  padding: 5px 10px;
  white-space: nowrap;
  overflow:hidden;
  max-width: 200px;
  cursor: ${props => props.noHintFound ? 'auto' : 'pointer'};
  background-color: ${props => props.selected ? '#69fec0' : '#fff'};
  font-weight: ${props => props.selected ? 'bold' : 'normal'};
`;

export {
  HintsContainer,
  Buttons,
  Button,
  Title,
  Hint,
}
