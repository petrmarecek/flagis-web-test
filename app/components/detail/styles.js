import styled, { css, keyframes } from 'styled-components'
import ContentEditable from '../common/content-editable'
import MarkdownEditable from '../common/markdown-editable'
import ToggleSwitch from '../common/toggle-switch'
import Icon from '../icons/icon'
import {
  boxSizing,
  placeholderColor,
  transition,
  transform,
  transformOrigin,
  borderRadius,
  commonCommentInputSmall,
  markdownStyles,
  fontMain,
} from '../styled-components-mixins/'
import { tada, fadeOutLeft, fadeOutRight } from 'react-animations'

// --------------------------------------- Animations ---------------------------------------
const tadaAnimation = keyframes`${tada}`
const leftHideDetailAnimation = keyframes`${fadeOutLeft}`
const rightHideDetailAnimation = keyframes`${fadeOutRight}`

// --------------------------------------- Detail -------------------------------------------
const DetailStyle = styled.div`
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
    box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: darkgrey;
  }
`

const DetailInner = styled.div`
  background-color: #fff;
  position: absolute;
  top: 42px;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  animation: ${props =>
    props.isMounted === false
      ? props.isRejected
        ? `${rightHideDetailAnimation} 400ms`
        : `${leftHideDetailAnimation} 400ms`
      : 'none'};
`

const DetailContentTop = styled.div`
  ${boxSizing('border-box')}
  display: flex;
  min-height: 48px;
  justify-content: flex-start;
  position: relative;
  background-color: ${props => props.backgroundColor};
  z-index: 1;
  padding: 0 12px;

  :before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #F6F7F8;
    ${transform(props => (props.completed ? 'scaleX(1)' : 'scaleX(0)'))}
    ${transformOrigin('0 50%')}
    ${transition(props =>
      props.animation ? 'transform 500ms ease-out' : 'none'
    )}
  }

  :after {
    content: "";
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: 0;
    border-bottom: 1px solid #44FFB1;
  }
`

const DetailContentSubject = styled.div`
  ${boxSizing('border-box')}
  flex: 1 1 auto;
  padding: 0 10px 0 0;
  max-width: 100%;
`

const DetailSubject = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  z-index: 30;
`

const DetailContentTagAutocomplete = styled.div`
  ${boxSizing('border-box')}
  flex: 0 1 auto;
  padding-right: 10px;
  padding-top: 12px;
  max-width: 70%;
  pointer-events: ${props => (props.allowed ? 'auto' : 'none')};
  opacity: ${props => (props.isCompleted ? '0.4' : '1')};
  ${transition(props => (props.animation ? 'opacity 400ms ease-out' : 'none'))}
`

const DetailContentTagAutocompleteTags = styled.ul`
  float: right;
  list-style-type: none;
`

const DetailContentButton = styled.div`
  ${boxSizing('border-box')}
  flex: 0 0 117px;
  display: flex;
  align-items: center;
  margin-right: 15px;
  pointer-events: ${props => (props.allowed ? 'auto' : 'none')};
  opacity: ${props => (props.isCompleted ? '0.4' : '1')};
  ${transition(props => (props.animation ? 'opacity 400ms ease-out' : 'none'))}
`

const DetailContentIcon = styled.div`
  ${boxSizing('border-box')}
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: auto;
  flex: 0 0 35px;
  text-align: right;
  padding-right: 6px;
  animation: ${props =>
    props.animation ? `500ms linear 1s ${tadaAnimation}` : 'none'};
  opacity: ${props => (props.isCompleted ? '0.4' : '1')};
  ${transition(props => (props.animation ? 'opacity 400ms ease-out' : 'none'))}
`

const DetailContentCenter = styled.div`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  flex-shrink: 100;
  height: 100%;
  flex-direction: ${props => (props.column ? 'column' : 'row')};
  padding: 21px 0 22px 0;
  pointer-events: ${props => (props.allowed ? 'auto' : 'none')};
`

const DetailContentProperties = styled.div`
  flex: 3;
  margin: 0 25px 0 13px;
  display: flex;
  flex-direction: column;
  justify-content: space-start;
`

const DetailContentOptions = styled.div`
  margin: 0 0 10px;
  pointer-events: ${props => (props.allowed ? 'auto' : 'none')};
`

const detailContentOptionsItemLabel = css`
  font-size: 14px;
  color: ${props => (props.changeColor ? '#293034' : '#b1b5b8')};
  font-weight: ${props => (props.important ? 'bold' : 'normal')};
`

const DetailContentAddContact = styled.div`
  position: relative;
  margin: 0 0 10px 0;
  padding-top: 10px;
  border-bottom: 1px solid #e1e4e5;
`

const DetailContentAddContactIcon = styled.div`
  position: absolute;
  left: 7px;
  bottom: 5px;
  pointer-events: none;
`

const DetailContentAddContactLabel = styled.div`
  ${detailContentOptionsItemLabel}
  position: absolute;
  left: 30px;
  bottom: 4px;
  pointer-events: none;
`

const DetailContentAddContactContent = styled.div`
  margin: 0 ${props => (props.isUnknownContact ? '22px' : '5px')} -3px ${props => (!props.isOwner ? '70px' : '55px')};
`

const DetailContentAddNewContact = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 5px;
  bottom: 4px;
  height: 18px;
  width: 18px;
  background-color: #b1b5b8;
  ${borderRadius('50%')}
  pointer-events: auto;
  cursor: pointer;

  :hover {
    background-color: #44ffb1;
  }
`

const DetailContentAutocompleteContacts = styled.ul`
  display: flex;
  align-items: center;
  padding: 0 0 6px 0;
  list-style-type: none;
`

const DetailContentImportant = styled.div`
  position: relative;
  margin: 0 0 10px 0;
  padding-top: 24px;
  pointer-events: ${props => (props.allowed ? 'auto' : 'none')};
  border-bottom: 1px solid #e1e4e5;
  cursor: pointer;
`

const DetailContentImportantIcon = styled(Icon)`
  position: absolute;
  left: 7px;
  bottom: 4px;
`

const DetailContentImportantLabel = styled.div`
  ${detailContentOptionsItemLabel}
  position: absolute;
  left: 30px;
  bottom: 4px;
`

const DetailContentImportantContent = styled(ToggleSwitch)`
  position: absolute;
  bottom: 4px;
  right: 5px;
`

const DetailContentDate = styled.div`
  position: relative;
  pointer-events: ${props => (props.allowed ? 'auto' : 'none')};
`

const DetailContentDateIcon = styled(Icon)`
  position: absolute;
  top: 7px;
  left: ${props => (props.reminder ? '5px' : '7px')};
  z-index: 1;
  pointer-events: none;
`

const DetailContentDateLabel = styled.div`
  position: absolute;
  top: 7px;
  left: 30px;
  z-index: 1;
  color: #b1b5b8;
  font-size: 14px;
  pointer-events: none;
`

const DetailContentDatePicker = styled.div`
  z-index: 2;
  .react-datepicker__input-container {
    input {
      text-align: right;
      font-size: 15px;
      background-color: transparent;
    }
  }

  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker-popper {
    z-index: 2;

    .react-datepicker {
      ${borderRadius('5px 0 5px 5px')}

      .react-datepicker__header {
        ${borderRadius('5px 0 0 0')}
      }

      .react-datepicker__today-button {
        ${borderRadius('0 0 5px 5px')}
      }

      .react-datepicker__time-container {
        ${borderRadius('0 5px 5px 0')}

        .react-datepicker__header {
          ${borderRadius('0 5px 0  0')}
        }

        .react-datepicker__time {
          ${borderRadius('0 0 5px 0')}
        }
      }
    }
  }
`

const DetailContentAttachments = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  z-index: 1;
`

const DetailContentComments = styled.div`
  flex: 4;
  margin-right: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const DetailContentCommentsAdd = styled.div`
  display: flex;
  margin-top: 10px;
`

const DetailContentCommentsAddIcon = styled.div`
  margin-right: 10px;
  flex: 1;
  pointer-events: none;
  z-index: 1;
`

const DetailContentCommentsAddInput = styled.div`
  flex: 12;
  position: relative;

  input {
    ${placeholderColor('#1c2124')}
    ${commonCommentInputSmall}
  }
`

// --------------------------------------- Detail menu ---------------------------------------
const Menu = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 42px;
`

const LeftMenu = styled.div`
  flex: 1;
  margin-left: 8px;
`

const RightMenu = styled.div`
  flex: 1;
  text-align: right;
  margin-right: 5px;

  svg {
    margin-left: 20px;
  }
`

// --------------------------------------- Content editable ---------------------------------------
const ContentEditableWrapper = styled.span`
  width: 100%;
`

const ContentEditableStyles = css`
  ${boxSizing('border-box')}
  line-height: 22px;
  font-size: 18px;
  outline: none !important;
  max-height: 134px;
  overflow-y: auto;
  overflow-x: hidden;
  ${transition(props =>
    props.animation ? 'margin 500ms ease-out, color 500ms ease-out' : 'none'
  )};
  color: ${props =>
    props.completed && !props.archived ? '#D7E3EC' : '#293034'};
  margin-left: ${props => props.marginLeft};
  text-decoration: ${props =>
    props.completed || props.archived ? 'line-through' : 'none'};
  font-weight: ${props => (props.important ? 'bold' : 'normal')};
  pointer-events: ${props => (props.allowed ? 'auto' : 'none')};

  :empty:before {
    color: #b1b5b8;
    content: attr(data-placeholder);
  }
`

// --------------------------------------- Markdown editable ---------------------------------------
const MarkdownEditableContainer = styled(MarkdownEditable)`
  ${fontMain}
  ${boxSizing('border-box')}
  position: relative;
  padding: 15px 2px 15px 15px;
  border: 1px solid #e1e4e5;
  width: 100%;
  height: 100%;
  font-size: 14px;
  cursor: text;

  .markdown__html {
    ${markdownStyles}
    color: #1c2124;
    padding-right: 13px;

    :empty:before {
      color: #b1b5b8;
      display: block;
      padding: 2px;
      content: attr(data-placeholder);
    }
  }

  .markdown__edit {
    ${placeholderColor('#1c2124')}
    color: #1c2124;
    border: none;
    padding-right: 13px;
    resize: none;
    width: 100%;
    height: ${props => (props.editHeight ? props.editHeight : '100%')};
  }
`

// --------------------------------------- Task detail ---------------------------------------

const DetailSubjectTaskCompleted = styled.div`
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
  cursor: pointer;

  :hover {
    svg {
      path {
        fill: ${props => (props.completed ? '#D7E3EC' : '#44FFB1')};
      }
    }
  }
`

const DetailSubjectTaskArchived = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${props => (props.archived ? '0' : '45px')};
  width: 40px;
  padding-left: ${props => (props.archived ? '13px' : '6px')};
  z-index: 1;
  cursor: pointer;
`

const DetailSubjectTaskFollowerResponse = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
`

const DetailSubjectTaskContentEditable = styled(ContentEditable)`
  ${ContentEditableStyles}
`

const DetailContentDescriptionTask = styled.div`
  flex: 6;
  margin-right: 22px;
  pointer-events: ${props => (props.allowed ? 'auto' : 'none')};
  z-index: 1;
`

// --------------------------------------- Tag detail ---------------------------------------
const DetailSubjectTagColor = styled(Icon)`
  pointer-events: none;
`

const DetailSubjectTagContentEditable = styled(ContentEditable)`
  ${ContentEditableStyles}
`

const DetailContentTagColor = styled.div`
  padding: 0 17px;
  max-width: 100%;
`

const DetailTagColorSelector = styled.div`
  display: flex;
  flex-direction: column;
  color: #b1b5b8;
  font-size: 14px;
`

const DetailTagColorSelectorLabel = styled.div`
  margin: 0 0 11px 0;
`

const DetailTagColorSelectorOptions = styled.ul`
  display: flex;
  flex-wrap: wrap;
`

const DetailTagColorSelectorItems = styled.li`
  flex: none;
  ${borderRadius('50%')}
  background-color: ${props => props.color};
  border: ${props => (props.selected ? '1px solid #293034' : 'none')};
  width: 24px;
  height: 24px;
  margin: 0 10px 10px 0;
  list-style-type: none;
  cursor: pointer;
`

const DetailContentDescriptionTag = styled.div`
  margin: 10px 17px 0 17px;
`

// --------------------------------------- Contact detail ---------------------------------------
const DetailSubjectIconContact = styled.div`
  pointer-events: none;
  margin: ${props => (props.isUser ? '0 5px' : '-2px 5px')};

  img {
    object-fit: cover;
  }
`

const DetailSubjectContactContentEditable = styled(ContentEditable)`
  ${ContentEditableStyles}
`

const DetailContentDescriptionContact = styled.div`
  flex: 3;
  margin-right: 22px;
`

const DetailContentContactData = styled.div`
  position: relative;
  color: #b1b5b8;
  font-size: 14px;
  padding: 0 0 2px 0;
  margin: 10px 0;
  border-bottom: 1px solid #e1e4e5;
  height: 22px;
`

const DetailContentContactDataLabel = styled.span`
  position: absolute;
  bottom: 2px;
  left: 3px;
`

const DetailContentContactDataContent = styled.div`
  margin: 0 5px 0 0;
  float: right;
  font-size: 18px;
  color: #293034;
  cursor: ${props => (props.button ? 'pointer' : 'default')};

  span {
    margin: 0 0 0 10px;
    font-size: 14px;
    font-weight: bold;
    color: #b1b5b8;
  }

  :hover {
    span {
      color: ${props => (props.button ? '#293034' : '#b1b5b8')};
    }

    svg {
      path {
        fill: ${props => (props.button ? '#293034' : '#b1b5b8')};
      }
    }
  }
`

export {
  DetailStyle,
  DetailInner,
  DetailContentTop,
  DetailContentSubject,
  DetailSubject,
  DetailContentTagAutocomplete,
  DetailContentTagAutocompleteTags,
  DetailContentButton,
  DetailContentIcon,
  DetailContentCenter,
  DetailContentProperties,
  DetailContentOptions,
  DetailContentAddContact,
  DetailContentAddContactLabel,
  DetailContentAddContactContent,
  DetailContentAddContactIcon,
  DetailContentAddNewContact,
  DetailContentAutocompleteContacts,
  DetailContentDate,
  DetailContentDateIcon,
  DetailContentDateLabel,
  DetailContentDatePicker,
  DetailContentImportant,
  DetailContentImportantIcon,
  DetailContentImportantLabel,
  DetailContentImportantContent,
  DetailContentAttachments,
  DetailContentComments,
  DetailContentCommentsAdd,
  DetailContentCommentsAddIcon,
  DetailContentCommentsAddInput,
  Menu,
  LeftMenu,
  RightMenu,
  ContentEditableWrapper,
  DetailSubjectTaskCompleted,
  DetailSubjectTaskArchived,
  DetailSubjectTaskFollowerResponse,
  DetailSubjectTaskContentEditable,
  DetailContentDescriptionTask,
  DetailSubjectTagColor,
  DetailSubjectTagContentEditable,
  DetailContentTagColor,
  DetailTagColorSelector,
  DetailTagColorSelectorLabel,
  DetailTagColorSelectorOptions,
  DetailTagColorSelectorItems,
  DetailContentDescriptionTag,
  DetailSubjectIconContact,
  DetailSubjectContactContentEditable,
  DetailContentDescriptionContact,
  DetailContentContactData,
  DetailContentContactDataLabel,
  DetailContentContactDataContent,
  MarkdownEditableContainer,
}
