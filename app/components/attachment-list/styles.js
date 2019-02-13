import styled from 'styled-components'
import { textOverflow } from 'components/styled-components-mixins'
import Icon from '../icons/icon'

const AttachmentListContainer = styled.div`
  padding-right: 20px;
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  max-height: 100%;
`

const AttachmentItemContainer = styled.li`
  display: block;
  list-style-type: none;
  font-size: 14px;
  margin: 2px 0;
  position: relative;
  color: #8c9da9;

  :last-of-type {
    margin-bottom: 15px;
  }
`

const AttachmentItemIconFile = styled(Icon)`
  position: absolute;
  display: block;
  top: 3px;
  left: 8px;
`

const AttachmentItemIconRemove = styled(Icon)`
  position: absolute;
  display: block;
  right: 3px;
  top: 6px;
`

const AttachmentItemFileName = styled.div`
  margin: 0 20px 15px 35px;
  line-height: 25px;
  overflow: hidden;
  ${textOverflow('ellipsis')}

  a {
    color: #8c9da9;

    :hover {
      color: #676d71;
    }
  }
`

export {
  AttachmentListContainer,
  AttachmentItemContainer,
  AttachmentItemIconFile,
  AttachmentItemIconRemove,
  AttachmentItemFileName,
}
