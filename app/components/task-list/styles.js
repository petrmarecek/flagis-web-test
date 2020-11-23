import styled, { keyframes, css } from 'styled-components'
import { flipOutX } from 'react-animations'
import {
  transition,
  transform,
  transformOrigin,
  textOverflow,
  borderRadius,
  fontMain,
  link,
} from '../styled-components-mixins'
import { colors } from '../styled-components-mixins/colors'

/*--------------------------- Task List Container (index) ------------------------------------*/

const InboxTaskList = styled.div`
  padding: 0 0 14px 0;
`

const InboxCounter = styled.div`
  font-size: 12px;
  height: 28px;
  display: flex;
  align-items: center;
  padding: 0 0 0 2px;
  color: ${colors.astrocopusGrey};
  ${fontMain};
`

/*----------------------------------- Task List ----------------------------------------------*/

const TaskListItems = styled.ul`
  clear: both;

  li {
    list-style-type: none;
  }
`

/*--------------------------------- Task List Item ------------------------------------------*/

const hideAnimation = keyframes`${flipOutX}`

const TaskItem = styled.div`
  /* Fill space between tasks while dragging */
  height: ${props => (props.dragging ? '58px' : '50px')};
  margin: ${props => (props.dragging ? '-4px 0 0' : '0 0 4px')};
  visibility: ${props => (props.dragging ? 'hidden' : 'visible')};

  ${borderRadius('3px')};
  overflow: hidden;
  list-style-type: none;
  cursor: pointer;
  position: relative;
  outline: none;
  background-color: ${props => props.backgroundColor};
  visibility: ${props => (props.dragging ? 'hidden' : 'visible')};
  animation: ${props =>
    !props.isMounted
      ? css`
          ${hideAnimation} 400ms;
        `
      : 'none'};

  :before {
    content: "";
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => props.selected ? props.theme.taskItem.wrapperSelectedBgColor : props.theme.taskItem.wrapperCompletedBgColor};
    ${transform(props =>
      props.completed ? 'scaleX(1)' : 'scaleX(0)'
    )} ${transformOrigin('0 50%')} ${transition('transform 500ms ease-out')};
  }
`

const Completed = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 45px;
  padding-right: 8px;
  z-index: 1;

  :hover {
    svg {
      path {
        fill: #44ffb1;
      }
    }
  }
`

const Archived = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${props => (props.archived ? '0' : '45px')};
  width: 45px;
  padding-left: ${props => (props.archived ? '13px' : '6px')};
  z-index: 1;
`

const FollowerResponse = styled.div`
  position: absolute;
  top: 12px;
  left: 11px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${props => props.marginLeft};
  margin-right: ${props => props.marginRight};
  ${transition('margin 500ms ease-out')};
`

const SubjectTags = styled.div`
  display: flex;
  z-index: 1;
`

const Subject = styled.div`
  ${textOverflow('ellipsis')};
  flex: auto;
  max-width: 70%;
  margin: ${props => (props.description ? '5px 0' : '14px 0 0 0')};
  height: 23px;
  line-height: 23px;
  font-size: 16px;
  overflow: hidden;
  white-space: nowrap;
  color: ${props => (props.completed
    ? props.theme.taskItem.subjectCompletedTextColor
    : props.theme.taskItem.subjectTextColor)};
  font-weight: ${props => (props.important ? 'bold' : 'normal')};
  text-decoration: ${props =>
    props.completed || props.archived ? 'line-through' : 'none'};
  ${transition('color 500ms ease-out')};
  ${link};
`

const Tags = styled.div`
  flex: auto;
  margin: 5px 0 0 5px;
`

const DescriptionDueDate = styled.div`
  display: flex;
  z-index: 1;
`

const Description = styled.div`
  ${textOverflow('ellipsis')};
  flex: 10 10 auto;
  font-size: 14px;
  height: 18px;
  line-height: 18px;
  max-height: 18px;
  white-space: nowrap;
  overflow: hidden;
  color: ${props => (props.completed ? '#CECECE' : '#8C9DA9')};
  margin: -5px 0 5px 0;
`

const DueDate = styled.div`
  flex: 10 0 65px;
  height: 18px;
  line-height: 18px;
  right: 18px;
  font-size: 12px;
  color: ${props =>
    props.overdue && !props.completed ? '#ff6a6a' : '#8C9DA9'};
  font-weight: ${props => (props.overdue && !props.completed ? 600 : 'normal')};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: ${props => (props.description ? '-4px 8px 0 0' : '-7px 8px 0 0')};
  z-index: 1;
`

const Followers = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 50px;
  width: ${props => (props.assigneeInbox ? '76px' : '63px')};
  padding-right: 17px;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
`

/*----------------------------------- Tag Items ----------------------------------------------*/

const TagItems = styled.ul`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  list-style-type: none;
  height: 100%;
`

const Item = styled.li`
  ${borderRadius('9px')};
  margin: 0 4px 8px 0;
  float: left;
  border: none;
  height: 18px;
  background-color: ${props => props.bgColor};
  opacity: ${props => (props.isCompleted ? '0.4' : '1')};
  max-width: ${props => (props.isItemCollapse ? '15px' : '120px')};
  ${transition('500ms')};
`

const Text = styled.div`
  ${textOverflow('ellipsis')} ${fontMain} display: flex;
  align-items: center;
  height: 18px;
  font-size: 12px;
  padding: 0 6px;
  overflow: hidden;
  white-space: nowrap;
  color: ${props => (props.isItemCollapse ? props.bgColor : '#fff')};
  ${transition('250ms')};
`

export {
  InboxTaskList,
  InboxCounter,
  TaskListItems,
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
  Text,
}
