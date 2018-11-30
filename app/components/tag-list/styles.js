import styled, { keyframes } from 'styled-components'
import { fadeInUp } from 'react-animations'

const fadeUp = keyframes`${fadeInUp}`;

const ItemContainer = styled.li`
  overflow: hidden;
  list-style-type: none;
  font-size: 16px;
  margin: 0 0 4px;
  cursor: pointer;
  position: relative;
  background-color: ${props => props.selected ? '#ffffd7' : '#fff'};
  animation: 400ms ${fadeUp};
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 30px;
`;

const ItemIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  margin: 0 10px;
`;

const ItemTitle = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: flex-start;
`;

const ItemTagRelations = styled.div`
  position: absolute;
  right: 20px;
`;

export {
  ItemContainer,
  Item,
  ItemIcon,
  ItemTitle,
  ItemTagRelations,
}
