import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Icon from '../icons/icon'

const Form = styled.div`
  max-width: ${props => (props.maxWidth ? props.maxWidth : 400)}px;
  width: ${props => (props.maxWidth ? '100%' : 'auto')};
  margin: ${props => (props.nonMargin ? '0' : '50px auto 0')};
  padding: ${props => (props.leftPadding ? '5px 0 0 24px' : '120px auto 0')};
`

const FormBody = styled.form`
  display: block;
  position: relative;
`

const FormBodyFields = styled.div`
  padding: 10px;
`

const FormErrors = styled.div`
  margin-bottom: 40px;
`

const ErrorList = styled.ul`
  list-style-type: none;
`

const ErrorListItem = styled.li.attrs(props => ({
  borderWidth: props.withoutBorder ? 0 : 1,
}))`
  display: flex;
  flex-flow: row wrap;
  border-bottom: ${props => props.borderWidth}px solid red;
  font-size: 14px;
  margin-bottom: 20px;
  padding: 5px 10px;
  color: red;
`

const ErrorListItemText = styled.div`
  flex: 19;
`

const ErrorListItemIcon = styled(Icon)`
  flex: 1;
`

const FormRow = styled.div`
  margin-top: 20px;
  cursor: ${props => (props.pointer ? 'pointer' : 'auto')};
`

const FormRowButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  cursor: ${props => (props.pointer ? 'pointer' : 'auto')};
`

const FormLink = styled(Link)`
  color: #8c9da9;
  font-size: 14px;
  cursor: pointer;
`

export {
  Form,
  FormBody,
  FormBodyFields,
  FormErrors,
  ErrorList,
  ErrorListItem,
  ErrorListItemIcon,
  ErrorListItemText,
  FormRow,
  FormRowButton,
  FormLink,
}
