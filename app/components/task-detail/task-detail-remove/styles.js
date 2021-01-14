import styled from 'styled-components'

import { ICONS } from '../../icons/icon-constants'

import {
  ContentBox,
  ContentBoxHeader,
  ContentBoxHeaderIcon,
  ContentBoxHeaderLeft,
  ContentBoxHeaderTitle,
  ContentBoxBody,
} from '../styles'

const Body = styled(ContentBoxBody)``

const Header = styled(ContentBoxHeader)``

const HeaderLeft = styled(ContentBoxHeaderLeft)``

const HeaderIcon = styled(ContentBoxHeaderIcon).attrs({
  color: ['#FF6A6A'],
  icon: ICONS.TRASH,
  scale: 0.56,
  height: 14,
  width: 13,
})``

const HeaderTitle = styled(ContentBoxHeaderTitle)`
  color: #FF6A6A;
`

const Wrapper = styled(ContentBox)`
  cursor: pointer;
`

export {
  Body,
  Header,
  HeaderIcon,
  HeaderLeft,
  HeaderTitle,
  Wrapper,
}
