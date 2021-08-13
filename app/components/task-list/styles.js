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
  boxShadow,
} from '../styled-components-mixins'
import { colors } from '../styled-components-mixins/colors'
import Icon from 'components/icons/icon'
import CommonButton from 'components/common/button'
import CheckIcon from 'components/icons/check-icon'

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
  height: ${props => (props.dragging ? '66px' : '58px')};
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
    background-color: ${props => (props.selected ? '#ecfff7' : '#F6F7F8')};
    ${transform(props =>
      props.completed ? 'scaleX(1)' : 'scaleX(0)'
    )} ${transformOrigin('0 50%')} ${transition('transform 500ms ease-out')};
  }

  :hover, :hover:before {
    ${boxShadow(`inset 0px 0px 0px 1px ${colors.porpoise}`)}
  }

`

const Completed = styled.div`
  display: flex;
  align-items: ${props => (props.hasDetailInfo ? 'flex-start' : 'center')};
  margin: ${props => (props.hasDetailInfo ? '12px 0 0 0' : '0')};
  justify-content: flex-end;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 45px;
  padding-right: 8px;
  z-index: 1;
`

const CompletedButton = styled(CommonButton)`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  background-color: ${props => (props.isCompleted ? '#00CD78' : '#FFFFFF')};
  border: 1px solid ${props => (props.isCompleted ? '#00CD78' : '#E4E4E4')};
  border-radius: 3.5px;
  box-sizing: border-box;
  filter: drop-shadow(0px 1px 3px rgba(216, 216, 216, 0.5));

  &:hover {
    border-color: #00cd78;
  }
`

const CompletedIcon = styled(CheckIcon)`
  g {
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
    opacity: ${props => (props.isCompleted ? 1 : 0.3)};

    path {
      fill: ${props => (props.isCompleted ? '#FFFFFF' : '#B1B5B8')};
    }

    ${CompletedButton}:hover & {
      box-shadow: none;
      opacity: 1;

      path {
        fill: ${props => (props.isCompleted ? '#FFFFFF' : '#00CD78')};
      }
    }
  }
`

const Archived = styled.div`
  display: flex;
  align-items: ${props => (props.hasDetailInfo ? 'flex-start' : 'center')};
  margin: ${props => (props.hasDetailInfo ? '12px 0 0 0' : '0')};
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
  top: 17px;
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
  margin: ${props => (props.hasDetailInfo ? '12px 0 0 0' : '18px 0 0 0')};
  height: 23px;
  line-height: 23px;
  font-size: 16px;
  overflow: hidden;
  white-space: nowrap;
  color: ${props => (props.completed ? '#CECECE' : '#293034')};
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
  align-items: flex-end;
  justify-content: flex-start;
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
  color: ${props =>
    props.completed ? colors.americanSilver : colors.lostAtSea};
  margin: -5px 0 5px 0;
`

const AdditionalInformation = styled.div`
  display: flex;
  align-items: center;
  height: 18px;
  line-height: 18px;
  font-size: 12px;
  color: ${props => (props.color ? props.color : colors.batman)};
  margin: 0 15px 0 0;
  z-index: 1;
`

const AdditionalInformationIcon = styled(Icon)`
  margin-right: 4px;
`

const Followers = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 50px;
  width: 63px;
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
  CompletedButton,
  CompletedIcon,
  Archived,
  FollowerResponse,
  Content,
  SubjectTags,
  Subject,
  Tags,
  DescriptionDueDate,
  Description,
  AdditionalInformation,
  AdditionalInformationIcon,
  Followers,
  TagItems,
  Item,
  Text,
}
