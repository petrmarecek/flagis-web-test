import styled from 'styled-components'

import { ICONS } from '../../icons/icon-constants'

import {
  ContentBox,
  ContentBoxHeader,
  ContentBoxHeaderIcon,
  ContentBoxHeaderLeft,
  ContentBoxHeaderTitle,
} from '../styles'

const Header = styled(ContentBoxHeader)``

const HeaderLeft = styled(ContentBoxHeaderLeft)``

const HeaderIcon = styled(ContentBoxHeaderIcon).attrs({
  color: '#1C2124',
  icon: ICONS.PIN,
  scale: 1.15,
  height: 15,
  width: 14,
})``

const HeaderTitle = styled(ContentBoxHeaderTitle)`
  color: #1c2124;
`

const Wrapper = styled(ContentBox)`
  background-color: #f0f0f0;

  cursor: pointer;
`

export { Header, HeaderLeft, HeaderIcon, HeaderTitle, Wrapper }
