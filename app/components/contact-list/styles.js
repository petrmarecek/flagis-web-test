import styled from 'styled-components'

export const ContactItemStyle = styled.li`
  overflow: hidden;
  list-style-type: none;
  font-size: 16px;
  margin: 0 0 4px;
  cursor: pointer;
  position: relative;
  background-color: white;
`;

export const ContactItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 50px;
`;

export const ContactItemIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  margin: 0 10px;
`;

export const ContactItemTitle = styled.div`
  margin-left: ${props => props.isUser ? '7px' : '0'};
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: flex-start;
`;
