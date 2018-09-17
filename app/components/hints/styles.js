import styled from 'styled-components'
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
`;

const Title = styled.li`
  background-color: #fff;
  display: block;
  margin: 0 5px;
  padding: 0 5px;
  font-size: 15px;
  height: 30px;
  line-height: 30px;
  border-width: ${props => props.directionRender === 'topToBottom' 
    ? '0 0 1px 0' 
    : '1px 0 0 0'
  };
  border-style: solid;
  border-color: #44FFB1;
`;

const Hint = styled.li`
  ${textOverflow('ellipsis')};
  display: block;
  height: auto;
  line-height: 16px;
  padding: 5px 10px;
  cursor: pointer;
  white-space: nowrap;
  overflow:hidden;
  max-width: 200px;
  background-color: ${props => props.selected ? '#69fec0' : '#fff'};
  font-weight: ${props => props.selected ? 'bold' : 'normal'};
`;

export {
  HintsContainer,
  Title,
  Hint,
}