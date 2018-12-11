import styled, { keyframes } from 'styled-components'
import { fadeInUp, flipOutX } from 'react-animations'
import {
  transition,
  transform,
  transformOrigin,
  textOverflow,
  borderRadius,
  fontMain
} from '../styled-components-mixins'

import Icon from '../icons/icon'

/*----------------------------------- Task Item ----------------------------------------------*/

const showAnimation = keyframes`${fadeInUp}`;
const hideAnimation = keyframes`${flipOutX}`;

const TaskItem = styled.div`
  height: 50px;
  overflow: hidden;
  list-style-type: none;
  margin: 0 0 4px;
  cursor: pointer;
  position: relative;
  outline: none;
  background-color: ${props => props.backgroundColor};
  visibility: ${props => props.dragging ? 'hidden' : 'visible'};
  animation: ${props => props.isMounted ? `${showAnimation} 400ms` : `${hideAnimation} 400ms`};

  :before {
    content: "";
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => props.selected ? '#ffffd7' : '#f6f7f8'};
    ${transform(props => props.completed ? 'scaleX(1)' : 'scaleX(0)')};
    ${transformOrigin('0 50%')};
    ${transition('transform 500ms ease-out')};
  }
`;

const Completed = styled(Icon)`
  position: absolute;
  top: 15px;
  left: 13px;
  z-index: 1;
`;

const Archived = styled(Icon)`
  position: absolute;
  top: ${props => props.archived ? '11px' : '13px'};
  left: ${props => props.archived ? '13px' : '50px'};
  z-index: 1;
`;

const FollowerResponse = styled.div`
  position: absolute;
  top: 12px;
  left: 11px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${props => props.marginLeft};
  margin-right: ${props => props.followers ? '70px' : '15px'};
  ${transition('margin 500ms ease-out')};
`;

const SubjectTags =  styled.div`
  display: flex;
`;

const Subject =  styled.div`
  ${textOverflow('ellipsis')}
  flex: auto;
  max-width: 70%;
  margin: ${props => props.description ? '5px 0' : '14px 0 0 0'};
  height: 23px;
  line-height: 23px;
  font-size: 18px;
  overflow: hidden;
  white-space: nowrap;
  color: ${props => props.completed ? '#cfdbe4' : '#293034'};
  font-weight: ${props => props.important ? 'bold' : 'normal'};
  text-decoration: ${props => (props.completed || props.archived) ? 'line-through' : 'none'};
  ${transition('color 500ms ease-out')};
  z-index: 1;
`;

const Tags =  styled.div`
  flex: auto;
  margin: 5px 0 0 5px;
  z-index: 1;
`;

const DescriptionDueDate =  styled.div`
  display: flex;
`;

const Description =  styled.div`
  ${textOverflow('ellipsis')}
  flex: 10 10 auto;
  font-size: 14px;
  height: 18px;
  line-height: 18px;
  max-height: 18px;
  white-space: nowrap;
  overflow: hidden;
  color: ${props => props.completed ? '#cfdbe4' : '#8C9DA9'};
  margin: -5px 0 5px 0;
  z-index: 1;
`;

const DueDate =  styled.div`
  flex: 10 0 60px;
  height: 18px;
  line-height: 18px;
  right: 18px;
  font-size: 12px;
  color: ${props => props.overdue && !props.completed ? '#ff6a6a' : '#8C9DA9'};
  font-weight: ${props => props.overdue && !props.completed ? 600 : 'normal'};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: ${props => props.description ? '-4px 8px 0 0' : '-7px 8px 0 0'};
  z-index: 1;
`;

const Followers = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 70px;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
`;

/*----------------------------------- Tag Items ----------------------------------------------*/

const TagItems =  styled.ul`
  display: flex;
  list-style-type: none;
  justify-content: flex-end;
`;

const Item = styled.li`
  ${borderRadius('12px')}
  margin: 0 6px 6px 0;
  border: none;
  padding: 0 10px 0 10px;
  display: flex;
  align-items: center;
  float: left;
  height: 23px;
  background-color: ${props => props.bgColor};
  max-width: ${props => props.isItemCollapse ? '23px' : '120px'};
  ${transition('500ms')};
`;

const Text = styled.div`
  ${textOverflow('ellipsis')}
  ${fontMain}
  font-size: 14px;
  line-height: 23px;
  overflow: hidden;
  white-space: nowrap;
  color: ${props => props.isItemCollapse ? props.bgColor : '#fff' };
  ${transition('250ms')};
`;

export {
  TaskItem,
  Completed,
  Archived,
  FollowerResponse,
  Content,
  SubjectTags,
  Subject,
  Tags,
  DescriptionDueDate,
  Description,
  DueDate,
  Followers,

  TagItems,
  Item,
  Text
}
