import styled from 'styled-components'
import { boxSizing, markdownStyles } from '../styled-components-mixins/'
import MarkdownEditable from '../common/markdown-editable'
import Icon from '../icons/icon'

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

const DetailContentDeleteIcon = styled.div`
  ${boxSizing('border-box')}
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

// Tag detail
const DetailSubjectTagColor = styled(Icon)`
  position: absolute;
  pointer-events: none;
  left: 4px;
  top: 3px;
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

const DetailContentPropertiesContact = styled.div`
  flex: 3;
  margin: 0 25px 0 13px;
  display: flex;
  flex-direction: column;
  justify-content: space-start;
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
  cursor: default;
`;

const DetailContentContactDataLabel = styled.span`
  margin: 0 0 0 3px;
`;

const DetailContentContactDataContent = styled.div`
  margin: 0 5px 2px 0;
  float: right;
  font-size: 18px;
  color: #293034;
`;

// Markdown
const MarkdownEditableContainer = styled(MarkdownEditable)`
  ${boxSizing('border-box')}
  padding: 15px 2px 15px 15px;
  background-color: #fff;
  border: 1px solid #D7E3EC;
  width: 100%;
  height: 100%;
  font-size: 14px;
  
  .markdown__html {
    ${markdownStyles}
    padding-right: 13px;
    color: ${props => props.text === 'Add description' ? '#8c9da9' : '#293034'};
    
    p {
      margin: ${props => props.text === 'Add description' ? '0' : '1em 0'};
    }
  }
  
  .markdown__edit {
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

export {
  // Detail
  DetailStyle,
  DetailInner,
  DetailContentTop,
  DetailContentSubject,
  DetailSubject,
  DetailContentDeleteIcon,
  DetailContentCenter,

  // Detail menu
  Menu,
  LeftMenu,
  RightMenu,

  // Tag detail
  DetailSubjectTagColor,
  DetailContentTagColor,
  DetailTagColorSelector,
  DetailTagColorSelectorLabel,
  DetailTagColorSelectorOptions,
  DetailContentDescriptionTag,

  // Contact detail
  DetailSubjectIconContact,
  DetailContentPropertiesContact,
  DetailContentDescriptionContact,
  DetailContentContactData,
  DetailContentContactDataLabel,
  DetailContentContactDataContent,

  // Markdown
  MarkdownEditableContainer,
}
