import styled, { keyframes } from 'styled-components'
import { fadeInUp, flipOutX } from 'react-animations'
import {
  transition,
  transform,
  transformOrigin,
  textOverflow,
  borderRadius,
  fontMain,
  link,
} from '../styled-components-mixins'

/*----------------------------------- Task List ----------------------------------------------*/
const TaskListItems = styled.ul`
  clear: both;

  li {
    list-style-type: none;
  }
`

const TimeLine = styled.ul`
  ${fontMain}
  padding-left: 25px;
  position: relative;

  &:before {
    content: '';
    width: 2px;
    height: 100%;
    background: #fff;
    left: 11px;
    top: 0;
    position: absolute;
  }

  &:after {
    content: '';
    width: 2px;
    height: 8px;
    background: #e8ecee;
    left: 11px;
    top: 0;
    position: absolute;
  }
`

const TimeLineList = styled.li`
  position: relative;
`

const TimeLinePoint = styled.span`
  &:before {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    position: absolute;
    background: #fff;
    left: -18px;
    top: 8px;
  }
`

const TimeLineText = styled.p`
  padding: 5px 0 5px 0;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  color: #8c9ea9;
`

/*----------------------------------- Task List Item ----------------------------------------------*/

const showAnimation = keyframes`${fadeInUp}`
const hideAnimation = keyframes`${flipOutX}`

const TaskItem = styled.div`
  height: 50px;
  overflow: hidden;
  list-style-type: none;
  margin: 0 0 4px;
  cursor: pointer;
  position: relative;
  outline: none;
  background-color: ${props => props.backgroundColor};
  visibility: ${props => (props.dragging ? 'hidden' : 'visible')};
  animation: ${props => {
    if (props.isMoved) {
      return 'none'
    }

    return props.isMounted ? `${showAnimation} 400ms` : `${hideAnimation} 400ms`
  }};

  :before {
    content: "";
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => (props.selected ? '#ffffd7' : '#ecfff7')};
    ${transform(props => (props.completed ? 'scaleX(1)' : 'scaleX(0)'))}
    ${transformOrigin('0 50%')}
    ${transition('transform 500ms ease-out')}
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
        fill: #00ffc7;
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

  :hover {
    svg {
      path {
        fill: ${props => (props.archived ? '#8c9ea9' : '#282f34')};
      }
    }
  }
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
  margin-right: ${props => (props.followers ? '70px' : '15px')};
  ${transition('margin 500ms ease-out')};
`

const SubjectTags = styled.div`
  display: flex;
`

const Subject = styled.div`
  ${textOverflow('ellipsis')}
  flex: auto;
  max-width: 70%;
  margin: ${props => (props.description ? '5px 0' : '14px 0 0 0')};
  height: 23px;
  line-height: 23px;
  font-size: 18px;
  overflow: hidden;
  white-space: nowrap;
  z-index: 1;
  color: ${props => (props.completed ? '#cfdbe4' : '#293034')};
  font-weight: ${props => (props.important ? 'bold' : 'normal')};
  text-decoration: ${props =>
    props.completed || props.archived ? 'line-through' : 'none'};
  ${transition('color 500ms ease-out')};
  ${link}
`

const Tags = styled.div`
  flex: auto;
  margin: 5px 0 0 5px;
  z-index: 1;
`

const DescriptionDueDate = styled.div`
  display: flex;
`

const Description = styled.div`
  ${textOverflow('ellipsis')}
  flex: 10 10 auto;
  font-size: 14px;
  height: 18px;
  line-height: 18px;
  max-height: 18px;
  white-space: nowrap;
  overflow: hidden;
  color: ${props => (props.completed ? '#cfdbe4' : '#8C9DA9')};
  margin: -5px 0 5px 0;
  z-index: 1;
`

const DueDate = styled.div`
  flex: 10 0 60px;
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
  justify-content: center;
  height: 50px;
  width: 70px;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
`

/*----------------------------------- Tag Items ----------------------------------------------*/

const TagItems = styled.ul`
  display: flex;
  list-style-type: none;
  justify-content: flex-end;
`

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
  max-width: ${props => (props.isItemCollapse ? '23px' : '120px')};
  ${transition('500ms')};
`

const Text = styled.div`
  ${textOverflow('ellipsis')}
  ${fontMain}
  font-size: 14px;
  line-height: 23px;
  overflow: hidden;
  white-space: nowrap;
  color: ${props => (props.isItemCollapse ? props.bgColor : '#fff')};
  ${transition('250ms')};
`

export {
  TaskListItems,
  TimeLine,
  TimeLineList,
  TimeLinePoint,
  TimeLineText,
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
