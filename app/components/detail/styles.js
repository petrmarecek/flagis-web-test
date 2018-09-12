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
  commonInputSmall,
  markdownStyles,
  fontMain,
} from '../styled-components-mixins/'

// Detail
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
  pointer-events: ${props => props.archived ? 'none' : 'auto'};
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
  flex-wrap: wrap;
  flex-grow: 100;
  min-height: 48px;
  justify-content: flex-start;
  position: relative;
  background-color: #fff;
  z-index: 1;
  padding: 0 12px;
  margin-bottom: 21px;
  
  :before {
    content: "";
    position: absolute;
    z-index:-1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => props.archived ? '#c1cad0' : '#f6f8f9'};
    ${transform(props => props.completed ? 'scaleX(1)' : 'scaleX(0)')}
    ${transformOrigin('0 50%')}
    ${transition(props => props.animation ? 'transform 500ms ease-out' : 'none')}
  }
  
  &:after {
    content: "";
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: 0;
    border-bottom: 2px solid #44FFB1;
  }
`;

const DetailContentSubject = styled.div`
  ${boxSizing('border-box')}
  flex: 12;
  min-width: 30%;
  padding: 11px 10px 11px 0;
`;

const DetailSubject = styled.div`
  position: relative;
  z-index: 30;
`;

const DetailContentTagAutocomplete = styled.div`
  ${boxSizing('border-box')}
  flex: 7;
  padding-right: 10px;
  min-width: 25%;
  padding-top: 12px;
`;

const DetailContentTagAutocompleteTags = styled.div`
  flex: 5;
  height: 22px;
  float: right;
`;

const DetailContentDeleteIcon = styled.div`
  ${boxSizing('border-box')}
  pointer-events: auto;
  flex: 1;
  max-width: 3%;
  text-align: right;
  padding-right: 6px;
  padding-top: 10px;
`;

const DetailContentCenter = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-shrink: 100;
  height: 100%;
  margin-bottom: 22px;
  flex-direction: ${props => props.column ? 'column' : 'row'};
`;

const DetailContentProperties = styled.div`
  flex: 3;
  margin: 0 25px 0 13px;
  display: flex;
  flex-direction: column;
  justify-content: space-start;
`;

const DetailContentOptions = styled.div`
  margin: 6px 0 10px;
`;

const detailContentOptionsItem = css`
  position: relative;
  color: #8c9da9;
  font-size: 14px;
  padding: 0 0 2px 0;
  margin: ${props => props.last ? '10px 0 0 0' : '0 0 10px 0'};
  border-bottom: 1px solid #D7E3EC;
  display: 'auto';
`;

const detailContentOptionsItemLabel = css`
  margin: 0 0 0 3px;
  color: ${props => props.changeColor ? '#293034' : '#8c9da9'};
  font-weight: ${props => props.important ? 'bold' : 'normal'};
`;

const DetailContentAddContact = styled.div`
  ${detailContentOptionsItem}
  cursor: 'default';
`;

const DetailContentAddContactLabel = styled.span`
  ${detailContentOptionsItemLabel}
`;

const DetailContentAddContactContent = styled.div`
  position: absolute;
  left: 26px;
  bottom: -4px;
`;

const DetailContentAddContactIcon = styled(Icon)`
  position: absolute;
  right: 5px;
  bottom: 2px;
  pointer-events: none;
`;

const DetailContentAutocompleteContacts = styled.div`
  flex: 5;
  height: 22px;
  float: right;
`;

const DetailContentImportant = styled.div`
  ${detailContentOptionsItem}
  cursor: ${props => props.archived ? 'default' : 'pointer'};
`;

const DetailContentImportantLabel = styled.div`
  ${detailContentOptionsItemLabel}
`;

const DetailContentImportantContent = styled.div`
  margin: -15px 5px 0 0;
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
      background-color: #fff;
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
`;

const DetailContentCommentsAddInput = styled.div`
  flex: 12;
  position: relative;

  input{
    ${placeholderColor('#8c9da9')}
    ${commonInputSmall}
    background-color: #fff;
  }
`;

// Detail menu
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

// Content editable
const ContentEditableContainer = css`
  ${boxSizing('border-box')}
  line-height: 22px;
  font-size: 18px;
  outline: none !important;
  padding-top: 3px;
  max-height: 134px;
  overflow-y: auto;
  overflow-x: hidden;
  color: ${props => (props.completed && !props.archived) ? '#D7E3EC' : '#293034'};
  margin-left: ${props => (props.completed && !props.archived) ? '85px' : '45px'};
  text-decoration: ${props => (props.completed || props.archived) ? 'line-through' : 'none'};
  font-weight: ${props => props.important ? 'bold' : 'normal'};
  ${transition(props => props.animation ? 'margin 500ms ease-out, color 500ms ease-out' : 'none')};
  pointer-events: ${props => props.archived ? 'none' : 'auto'};
  
  :empty:before {
    color: #8c9da9;
    content: attr(data-placeholder);
  }
`;

// Markdown editable
const MarkdownEditableContainer = styled(MarkdownEditable)`
  ${boxSizing('border-box')}
  padding: 15px 2px 15px 15px;
  background-color: #fff;
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

// Task detail
const DetailSubjectTaskCompleted = styled(Icon)`
  position: absolute;
  left: 5px;
  top: 0;
  margin: 2px 5px;
`;

const DetailSubjectTaskArchived = styled(Icon)`
  position: absolute;
  pointer-events: auto;
  left: ${props => props.archived ? '5px' : '40px'};
  top: ${props => props.archived ? '-1px' : '0'};
  top: 0;
  margin: 0 5px;
`;

const DetailSubjectTaskContentEditable = styled(ContentEditable)`
  ${ContentEditableContainer}
`;

const DetailContentDescriptionTask = styled.div`
  flex: 6;
  margin-right: 22px;
`;

// Tag detail
const DetailSubjectTagColor = styled(Icon)`
  position: absolute;
  pointer-events: none;
  left: 4px;
  top: 3px;
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

const DetailContentDescriptionTag = styled.div`
  margin: 0 17px;
  height: calc(100% - 69px);
`;

// Contact detail
const DetailSubjectIconContact = styled.div`
  position: absolute;
  left: 5px;
  top: 0;
  margin: 2px 5px;
  padding: ${props => props.isUser ? '2px 0 0 0' : '0'};
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
  cursor: ${props => props.button ? 'pointer' : 'default'};
  
  :hover {
    color: ${props => props.button ? '#293034' : '#8c9da9'};
    font-weight: ${props => props.button ? 'bold' : 'normal'};
    
    svg {
      path {
        fill: ${props => props.button ? '#293034' : '#8c9da9'};;
      }
    }
  }
  
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
`;

export {
  // Detail
  DetailStyle,
  DetailInner,
  DetailContentTop,
  DetailContentSubject,
  DetailSubject,
  DetailContentTagAutocomplete,
  DetailContentTagAutocompleteTags,
  DetailContentDeleteIcon,
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

  // Detail menu
  Menu,
  LeftMenu,
  RightMenu,

  // Task detail
  DetailSubjectTaskCompleted,
  DetailSubjectTaskArchived,
  DetailSubjectTaskContentEditable,
  DetailContentDescriptionTask,

  // Tag detail
  DetailSubjectTagColor,
  DetailSubjectTagContentEditable,
  DetailContentTagColor,
  DetailTagColorSelector,
  DetailTagColorSelectorLabel,
  DetailTagColorSelectorOptions,
  DetailContentDescriptionTag,

  // Contact detail
  DetailSubjectIconContact,
  DetailSubjectContactContentEditable,
  DetailContentDescriptionContact,
  DetailContentContactData,
  DetailContentContactDataLabel,
  DetailContentContactDataContent,

  // Markdown
  MarkdownEditableContainer,
}
