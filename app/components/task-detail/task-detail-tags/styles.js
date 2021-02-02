import styled from 'styled-components'

import { ICONS } from '../../icons/icon-constants'

import {
  ContentBox,
  ContentBoxHeader,
  ContentBoxHeaderIcon,
  ContentBoxHeaderLeft,
  ContentBoxHeaderTitle,
  ContentBoxBody, ContentBoxHeaderLock, ContentBoxHeaderLockIcon,
} from '../styles'

const Body = styled(ContentBoxBody)`
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 2px 9px 8px;
`

const Header = styled(ContentBoxHeader)``

const HeaderLeft = styled(ContentBoxHeaderLeft)``

const HeaderIcon = styled(ContentBoxHeaderIcon).attrs({
  icon: ICONS.TAG_MULTI,
  scale: 0.78,
  height: 9,
  width: 15,
})``

const HeaderTitle = styled(ContentBoxHeaderTitle)``

const HeaderLock = styled(ContentBoxHeaderLock)``

const HeaderLockIcon = styled(ContentBoxHeaderLockIcon)``

const Wrapper = styled(ContentBox)`
  &:hover {
    box-shadow: 1px 2px 9px rgba(214, 214, 214, 0.5);
  }
`

export {
  Body,
  Header,
  HeaderIcon,
  HeaderLeft,
  HeaderLock,
  HeaderLockIcon,
  HeaderTitle,
  Wrapper,
}
