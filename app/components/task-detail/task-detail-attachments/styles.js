import styled from 'styled-components'

import Icon from '../../icons/icon'
import { ICONS } from '../../icons/icon-constants'

import {
  ContentBox,
  ContentBoxHeader,
  ContentBoxHeaderIcon,
  ContentBoxHeaderLeft,
  ContentBoxHeaderTitle,
  ContentBoxBody,
} from '../styles'

const Body = styled(ContentBoxBody)`
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  padding: 0 15px 10px 50px;
`

const Header = styled(ContentBoxHeader).attrs({
  large: true,
})``

const HeaderLeft = styled(ContentBoxHeaderLeft)`
  width: 35px;
`

const HeaderIcon = styled(ContentBoxHeaderIcon).attrs({
  color: '#1C2124',
  icon: ICONS.PIN,
  scale: 1.54,
  height: 20,
  width: 19,
})``

const HeaderTitle = styled(ContentBoxHeaderTitle).attrs({
  large: true,
})``

const Wrapper = styled(ContentBox)``

// ------ ITEM ----------------------------------------------------------------
const Item = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;

  margin: 0 0 5px;
`

const ItemFile = styled.a.attrs({
  target: '_blank',
})``

const ItemIcon = styled(Icon).attrs({
  icon: ICONS.FILE_EMPTY,
  color: ['#B1B5B8'],
  width: 12,
  height: 15,
  scale: 0.4,
})``

const ItemTitle = styled.span`
  padding: 0 10px;

  font-size: 13px;
  line-height: 15px;
  color: #1c2124;
`

const ItemDelete = styled(Icon).attrs({
  icon: ICONS.CROSS_SIMPLE,
  color: ['#B1B5B8'],
  width: 10,
  height: 10,
  scale: 0.66,
})`
  visibility: hidden;

  ${Item}:hover & {
    visibility: visible;
  }
`

export {
  Body,
  Header,
  HeaderLeft,
  HeaderIcon,
  HeaderTitle,
  Wrapper,
  // ITEM
  Item,
  ItemDelete,
  ItemFile,
  ItemIcon,
  ItemTitle,
}
