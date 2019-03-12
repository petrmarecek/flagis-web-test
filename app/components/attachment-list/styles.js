import styled from 'styled-components'
import { textOverflow } from 'components/styled-components-mixins'
import Icon from '../icons/icon'

const ListWrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  max-height: 100%;
`

const ItemWrapper = styled.li`
  display: block;
  list-style-type: none;
  font-size: 14px;
  position: relative;
  margin: 2px 0 0 0;
  border-bottom: 1px solid #e1e4e5;

  :last-of-type {
    margin-bottom: 15px;
    border-bottom: 1px solid #fff;
  }

  :hover {
    svg:first-of-type {
      path {
        fill: #1c2124;
      }
    }

    a {
      color: #1c2124;
    }
  }
`

const IconFile = styled(Icon)`
  position: absolute;
  display: block;
  top: 3px;
  left: 8px;
`

const IconRemove = styled(Icon)`
  position: absolute;
  display: block;
  right: 9px;
  top: 6px;
`

const FileName = styled.div`
  margin: 0 30px 2px 35px;
  line-height: 25px;
  overflow: hidden;
  white-space: nowrap;
  ${textOverflow('ellipsis')}

  a {
    color: #b1b5b8;
  }
`

export { ListWrapper, ItemWrapper, IconFile, IconRemove, FileName }
