import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Icon from '../icons/icon'

const Form = styled.div`
  max-width: 400px;
  margin: ${props => (props.unmargin ? '0' : '50px auto 0')};
  padding: ${props => (props.leftPadding ? '5px 0 0 24px' : '120px auto 0')};
`

const FormBody = styled.form`
  display: block;
  position: relative;
`

const FormBodyFields = styled.div`
  padding: 10px;
`

const FormLoader = styled.div`
  position: absolute;
  background: #fff;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  flex: 1;
  display: flex;
  align-items: center;
  opacity: 0.8;
`

const FormErrors = styled.div`
  margin-bottom: 40px;
`

const ErrorList = styled.ul`
  list-style-type: none;
`

const ErrorListItem = styled.li`
  display: flex;
  flex-flow: row wrap;
  border-bottom: 1px solid red;
  font-size: 15px;
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

const FormLink = styled(Link)`
  color: #8c9da9;
  font-size: 14px;
  cursor: pointer;
`

export {
  Form,
  FormBody,
  FormBodyFields,
  FormLoader,
  FormErrors,
  ErrorList,
  ErrorListItem,
  ErrorListItemIcon,
  ErrorListItemText,
  FormRow,
  FormLink,
}
