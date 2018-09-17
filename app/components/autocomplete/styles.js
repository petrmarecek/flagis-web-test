import styled from 'styled-components'
import Icon from '../icons/icon'
import {
  boxSizing,
  borderRadius,
  placeholderColor,
  textOverflow,
  fontSub,
  fontMain
} from '../styled-components-mixins'

// -------------------------------------- Autocompelete --------------------------------------------------
const AutocompleteContainer = styled.ul`
  ${boxSizing('border-box')}
  margin: 0;
  float: ${props => props.taskDetailTags ? 'right' : 'none'};
  padding: ${props => props.taskDetailTags ? '0' : '8px 0 0'};
  height: auto !important;
  list-style-type: none;
  cursor: text;
  border: none;

  &:after {
      content: "";
      display: block;
      clear: both;
  }
`;

const Clear = styled.li`
  ${boxSizing('border-box')}
  ${borderRadius('13px')}
  float: left;
  border: 1px solid #8c9da9;
  padding: 4px 0 0 5px;
  height: 23px;
  width: 23px;
  cursor: pointer;
  margin: 0 5px 0 0;
`;

const Search = styled.li`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  padding: 0 5px;
  height: 25px;
  float: ${props => props.taskDetailTags ? 'right' : 'none'};

  &:after {
      content: "";
      clear: both;
  }
`;

// -------------------------------------- AutocompeleteInput ---------------------------------------------
const Input = styled.input`
  ${placeholderColor('#8c9da9')}
  ${fontSub}
  position: relative;
  color: ${props => props.mainSearch ? '#fff': '#555'};
  background: none repeat scroll 0 0 transparent !important;
  border: 0 none !important;
  outline: 0 none;
  float: left;
  box-shadow: none;
  cursor: text;
  margin: 0 !important;
  padding: 1px 0 3px 0;
  font-size: ${props => props.mainSearch ? '15px': '14px'};

  :active {
    outline: none;
  }

  :disabled {
    cursor: text;
  }

  ::-ms-clear {
    display: none;
  }
`;

// -------------------------------------- AutocompeleteItem -------------------------------------------
const TagContainer = styled.li`
  ${fontMain}
  ${borderRadius('12px')}
  background-color: ${props => props.tagColor};
  margin: 0 6px 0 0;
  border: none;
  padding: 0 10px 0 10px;
  display: flex;
  align-items: center;
  float: left;
  height: 23px;
  line-height: 23px;
`;

const ContactContainer = styled.li`
  display: flex;
  align-items: center;
  padding: 0 0 6px 0;
`;

const Title = styled.span`
  font-size: 14px;
  line-height: 15px;
  color: ${props => props.color};
  margin-right: 8px;
  overflow: hidden;
  white-space: nowrap;
  ${textOverflow('ellipsis')}
`;

const Delete = styled.span`
  ${boxSizing('border-box')}
  ${borderRadius('7px')}
  border: 1px solid #8c9da9;
  height: 14px;
  width: 14px;
  cursor: pointer;
  flex-shrink: 0;
  position: relative;
`;

const DeleteIcon = styled(Icon)`
  position: absolute;
  top: 3px;
  left: 3px;
`;

export {
  AutocompleteContainer,
  Clear,
  Search,
  Input,
  TagContainer,
  ContactContainer,
  Title,
  Delete,
  DeleteIcon,
}
