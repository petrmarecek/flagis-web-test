import styled from 'styled-components'
import Icon from '../icons/icon'
import {
  boxSizing,
  borderRadius,
  placeholderColor,
  textOverflow,
  fontSub,
  fontMain,
} from '../styled-components-mixins'

// -------------------------------------- Autocompelete --------------------------------------------------
const AutocompleteContainer = styled.ul`
  ${boxSizing('border-box')}
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0;
  float: ${props => (props.taskDetailTags ? 'right' : 'none')};
  padding: 0;
  height: auto !important;
  list-style-type: none;
  cursor: text;
  border: none;

  &:after {
    content: '';
    display: block;
    clear: both;
  }
`

const Clear = styled.li`
  ${boxSizing('border-box')}
  ${borderRadius('13px')}
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
  border: 1px solid #b1b5b8;
  height: 20px;
  width: 20px;
  cursor: pointer;
  margin: 0 0 0 4px;
`

const Search = styled.li`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  padding: 0 5px;
  height: 25px;
  float: ${props => (props.taskDetailTags ? 'right' : 'none')};

  &:after {
    content: '';
    clear: both;
  }
`

// -------------------------------------- AutocompeleteInput ---------------------------------------------
const InputContainer = styled.div`
  width: 100%;
`

const Input = styled.input`
  ${placeholderColor(props => (props.mainSearch ? '#B1B5B8' : '#8c9da9'))}
  ${fontSub}
  position: relative;
  color: #676d71;
  background: none repeat scroll 0 0 transparent !important;
  border: 0 none !important;
  outline: 0 none;
  float: left;
  box-shadow: none;
  cursor: text;
  margin: 0 !important;
  padding: ${props => (props.mainSearch ? '1px 0 0 0' : '1px 0 3px 0')};
  font-size: 14px;
  font-weight: 500;
  width: 100%;

  :active {
    outline: none;
  }

  :disabled {
    cursor: text;
  }

  ::-ms-clear {
    display: none;
  }
`

// -------------------------------------- AutocompeleteItem -------------------------------------------
const TagContainer = styled.li`
  ${fontMain}
  ${borderRadius('12px')}
  background-color: ${props => props.tagColor};
  margin: ${props => (props.mainSearch ? '0 6px 0 0' : '0 6px 6px 0')};
  border: none;
  padding: 0 10px 0 10px;
  display: flex;
  align-items: center;
  float: left;
  height: 23px;
  line-height: 23px;
`

const ContactContainer = styled.li`
  display: flex;
  align-items: center;
  padding: 0 0 6px 0;
`

const Title = styled.span`
  font-size: 14px;
  line-height: 15px;
  color: ${props => props.color};
  margin-right: 8px;
  overflow: hidden;
  white-space: nowrap;
  ${textOverflow('ellipsis')}
`

const Delete = styled.span`
  ${boxSizing('border-box')}
  ${borderRadius('7px')}
  border: 1px solid #8c9da9;
  height: 14px;
  width: 14px;
  cursor: pointer;
  flex-shrink: 0;
  position: relative;
`

const DeleteIcon = styled(Icon)`
  position: absolute;
  top: 3px;
  left: 3px;
`

export {
  AutocompleteContainer,
  Clear,
  Search,
  InputContainer,
  Input,
  TagContainer,
  ContactContainer,
  Title,
  Delete,
  DeleteIcon,
}
