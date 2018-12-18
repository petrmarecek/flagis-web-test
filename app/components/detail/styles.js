import styled, { css } from 'styled-components'
import ContentEditable from '../common/content-editable'
import MarkdownEditable from '../common/markdown-editable'
import Icon from '../icons/icon'
import {
  boxSizing,
  placeholderColor,
  transition,
  transform,
  transformOrigin,
  borderRadius,
  commonInputSmall,
  markdownStyles,
  fontMain,
} from '../styled-components-mixins/'

// --------------------------------------- Detail ---------------------------------------
const DetailStyle = styled.div`
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 3px rgba(0,0,0,0.3);
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: darkgrey;
  }
`;

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
`;

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
    z-index:-1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ecfff7;
    ${transform(props => props.completed ? 'scaleX(1)' : 'scaleX(0)')}
    ${transformOrigin('0 50%')}
    ${transition(props => props.animation ? 'transform 500ms ease-out' : 'none')}
  }

  :after {
    content: "";
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: 0;
    border-bottom: 1px solid #44FFB1;
  }
`;

const DetailContentSubject = styled.div`
  ${boxSizing('border-box')}
  flex: 10 10 auto;
  padding: 0 10px 0 0;
  max-width: ${props => props.taskDetail ? '70%' : '100%'};
`;

const DetailSubject = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  z-index: 30;
`;

const DetailContentTagAutocomplete = styled.div`
  ${boxSizing('border-box')}
  flex: 10 10 auto;
  padding-right: 10px;
  padding-top: 12px;
  max-width: 70%;
  pointer-events: ${props => props.allowed ? 'auto' : 'none'};
`;

const DetailContentTagAutocompleteTags = styled.ul`
  float: right;
  list-style-type: none;
`;

const DetailContentButton = styled.div`
  ${boxSizing('border-box')}
  flex: 0 0 117px;
  display: flex;
  align-items: center;
  margin-right: 7px;
  pointer-events: ${props => props.allowed ? 'auto' : 'none'};
`;

const DetailContentIcon = styled.div`
  ${boxSizing('border-box')}
  display: flex;
  align-items: center;
  pointer-events: auto;
  flex: 0 0 35px;
  text-align: right;
  padding-right: 6px;
`;

const DetailContentCenter = styled.div`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  flex-shrink: 100;
  height: 100%;
  flex-direction: ${props => props.column ? 'column' : 'row'};
  padding: 21px 0 22px 0;
  pointer-events: ${props => props.allowed ? 'auto' : 'none'};

  :before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ecfff7;
    ${borderRadius('4px 4px 0 0')}
    ${transform(props => props.allowed ? 'scaleX(0)' : 'scaleX(1)')}
    ${transformOrigin('0 50%')}
    ${transition(props => props.animation ? 'transform 500ms ease-out' : 'none')}
  }
`;

const DetailContentProperties = styled.div`
  flex: 3;
  margin: 0 25px 0 13px;
  display: flex;
  flex-direction: column;
  justify-content: space-start;
`;

const DetailContentOptions = styled.div`
  margin: 0 0 10px;
  pointer-events: ${props => props.allowed ? 'auto' : 'none'};
`;

const detailContentOptionsItem = css`

  position: relative;
  color: #8c9da9;
  padding: 0 0 2px 0;
  border-bottom: 1px solid #D7E3EC;
`;

const detailContentOptionsItemLabel = css`
  margin: 0 0 0 3px;
  font-size: 14px;
  color: ${props => props.changeColor ? '#293034' : '#8c9da9'};
  font-weight: ${props => props.important ? 'bold' : 'normal'};
`;

const DetailContentAddContact = styled.div`
  ${detailContentOptionsItem}
  margin: 0 0 10px 0;
  cursor: default;
  padding: 10px 0 2px 0;
`;

const DetailContentAddContactLabel = styled.div`
  ${detailContentOptionsItemLabel}
  position: relative;
`;

const DetailContentAddContactContent = styled.div`
  position: absolute;
  left: ${props => !props.isOwner ? '45px': '26px'};
  right: ${props => !props.isOwner ? '5px': '35px'};
  bottom: -5px;
`;

const DetailContentAddContactIcon = styled.div`
  position: absolute;
  right: 5px;
  bottom: 2px;
  pointer-events: none;
`;

const DetailContentAutocompleteContacts = styled.ul`
  display: flex;
  align-items: center;
  padding: 0 0 6px 0;
  list-style-type: none;
`;

const DetailContentImportant = styled.div`
  ${detailContentOptionsItem}
  margin: 10px 0;
  pointer-events: ${props => props.allowed ? 'auto' : 'none'};
  cursor: pointer;
`;

const DetailContentImportantLabel = styled.div`
  ${detailContentOptionsItemLabel}
`;

const DetailContentImportantContent = styled.div`
  margin: -11px 5px 0 0;
  float: right;

  span {
    font-weight: bold;
  }
`;

const DetailContentDate = styled.div`
  position: relative;
`;

const DetailContentDateLabel = styled.div`
  position: absolute;
  top: 10px;
  left: 3px;
  z-index: 1;
  color: #8c9da9;
  font-size: 14px;
  pointer-events: none;
`;

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
      .border-radius(5px 0 5px 5px);

      .react-datepicker__header {
        .border-radius(5px 0 0 0);
      }

      .react-datepicker__today-button {
        .border-radius(0 0 5px 5px);
      }

      .react-datepicker__time-container {
        .border-radius(0 5px 5px 0);

        .react-datepicker__header {
          .border-radius(0 5px 0 0);
        }

        .react-datepicker__time{
          .border-radius(0 0 5px 0);
        }
      }
    }
  }
`;

const DetailContentAttachments = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  z-index: 1;
`;

const DetailContentComments = styled.div`
  flex: 4;
  margin-right: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const DetailContentCommentsAdd = styled.div`
  display: flex;
  margin-top: 10px;
`;

const DetailContentCommentsAddIcon = styled.div`
  margin-right: 10px;
  flex: 1;
  pointer-events: none;
  z-index: 1;
`;

const DetailContentCommentsAddInput = styled.div`
  flex: 12;
  position: relative;

  input {
    ${placeholderColor('#8c9da9')}
    ${commonInputSmall}
  }
`;

// --------------------------------------- Detail menu ---------------------------------------
const Menu = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 42px;
`;

const LeftMenu = styled.div`
  flex: 1;
  margin-left: 8px;
`;

const RightMenu = styled.div`
  flex: 1;
  text-align: right;
  margin-right: 5px;

  svg {
    margin-left: 20px;
  }
`;

// --------------------------------------- Content editable ---------------------------------------
const ContentEditableContainer = css`
  ${boxSizing('border-box')}
  line-height: 22px;
  font-size: 18px;
  outline: none !important;
  max-height: 134px;
  overflow-y: auto;
  overflow-x: hidden;
  ${transition(props => props.animation ? 'margin 500ms ease-out, color 500ms ease-out' : 'none')};
  color: ${props => (props.completed && !props.archived) ? '#D7E3EC' : '#293034'};
  margin-left: ${props => props.marginLeft ? props.marginLeft : '45px'};
  text-decoration: ${props => (props.completed || props.archived) ? 'line-through' : 'none'};
  font-weight: ${props => props.important ? 'bold' : 'normal'};
  pointer-events: ${props => props.allowed ? 'auto' : 'none'};

  :empty:before {
    color: #8c9da9;
    content: attr(data-placeholder);
  }
`;

// --------------------------------------- Markdown editable ---------------------------------------
const MarkdownEditableContainer = styled(MarkdownEditable)`
  ${boxSizing('border-box')}
  padding: 15px 2px 15px 15px;
  border: 1px solid #D7E3EC;
  width: 100%;
  height: 100%;
  font-size: 14px;

  .markdown__html {
    ${fontMain}
    ${markdownStyles}
    padding-right: 13px;

    :empty:before {
      color: #8c9da9;
      display: block;
      padding: 2px;
      content: attr(data-placeholder);
    }
  }

  .markdown__edit {
    ${placeholderColor('#8c9da9')}
    font-family: 'Source Sans Pro', 'Segoe UI', sans-serif;
    font-weight: 300;
    border: none;
    padding-right: 13px;
    resize: none;
    width: 100%;
    height: 100%;
    color: '#293034';
  }
`;

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
        fill: ${props => props.completed ? '#D7E3EC' : '#00FFC7'};
      }
    }
  }
`;

const DetailSubjectTaskArchived = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${props => props.archived ? '0' : '45px'};
  width: 40px;
  padding-left: ${props => props.archived ? '13px' : '6px'};
  z-index: 1;
  cursor: pointer;

  :hover {
    svg {
      path {
        fill: ${props => props.archived ? '#8c9ea9' : '#282f34'};
      }
    }
  }
`;

const DetailSubjectTaskFollowerResponse = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
`;

const DetailSubjectTaskContentEditable = styled(ContentEditable)`
  ${ContentEditableContainer}
`;

const DetailContentDescriptionTask = styled.div`
  flex: 6;
  margin-right: 22px;
  pointer-events: ${props => props.allowed ? 'auto' : 'none'};
  z-index: 1;
`;

// --------------------------------------- Tag detail ---------------------------------------
const DetailSubjectTagColor = styled(Icon)`
  position: absolute;
  pointer-events: none;
  left: 4px;
`;

const DetailSubjectTagContentEditable = styled(ContentEditable)`
  ${ContentEditableContainer}
  margin-left: 50px;
`;

const DetailContentTagColor = styled.div`
  margin: 0 17px;
`;

const DetailTagColorSelector = styled.div`
  color: #8C9DA9;
  font-size: 14px;
`;

const DetailTagColorSelectorLabel = styled.div`
  display: block;
  margin: 0 0 11px 0;
`;

const DetailTagColorSelectorOptions = styled.ul`
  &:after {
    display: block;
    content: "";
    clear: both;
  }
`;

const DetailTagColorSelectorItems = styled.li`
  ${borderRadius('50%')}
  background-color: ${props => props.color};
  border: ${props => props.selected ? '1px solid #293034' : 'none'};
  float: left;
  width: 24px;
  height: 24px;
  margin: 0 9px 20px 0;
  list-style-type: none;
  cursor: pointer;
`;

const DetailContentDescriptionTag = styled.div`
  margin: 0 17px;
  height: calc(100% - 69px);
`;

// --------------------------------------- Contact detail ---------------------------------------
const DetailSubjectIconContact = styled.div`
  position: absolute;
  left: 5px;
  margin: ${props => props.isUser ? '0 5px' : '-2px 5px'}
`;

const DetailSubjectContactContentEditable = styled(ContentEditable)`
  ${ContentEditableContainer}
`;

const DetailContentDescriptionContact = styled.div`
  flex: 3;
  margin-right: 22px;
`;

const DetailContentContactData = styled.div`
  position: relative;
  color: #8c9da9;
  font-size: 14px;
  padding: 0 0 2px 0;
  margin: 10px 0;
  border-bottom: 1px solid #D7E3EC;
  height: 22px;
`;

const DetailContentContactDataLabel = styled.span`
  position: absolute;
  bottom: 2px;
  left: 3px;
`;

const DetailContentContactDataContent = styled.div`
  margin: 0 5px 0 0;
  float: right;
  font-size: 18px;
  color: #293034;
  cursor: ${props => props.button ? 'pointer' : 'default'};

  span {
    margin: 0 0 0 10px;
    font-size: 14px;
    font-weight: bold;
    color: #8c9da9;
  }

  :hover {
    span {
      color: ${props => props.button ? '#293034' : '#8c9da9'};
    }

    svg {
      path {
        fill: ${props => props.button ? '#293034' : '#8c9da9'};
      }
    }
  }
`;

const DetailContentContactButton = styled.div`
  ${transition('500ms')}
  ${borderRadius('15px')}
  position: relative;
  background-color: #8c9da9;
  margin: 20px 0 0 0;
  border: none;
  height: 27px;
  width: 125px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    ${transition('500ms')}
    background-color: #293034;
  }

`;

const DetailContentContactButtonLabel = styled.span`
  color: #fff;
  font-size: 16px;
  margin: 0 0 1px 0;
`;

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
  DetailContentAutocompleteContacts,
  DetailContentDate,
  DetailContentDateLabel,
  DetailContentDatePicker,
  DetailContentImportant,
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
  DetailContentContactButton,
  DetailContentContactButtonLabel,

  MarkdownEditableContainer,
}
