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
import ToggleSwitch from 'components/common/toggle-switch'

const Body = styled(ContentBoxBody)``

const Header = styled(ContentBoxHeader)``

const HeaderLeft = styled(ContentBoxHeaderLeft)``

const HeaderIcon = styled(ContentBoxHeaderIcon).attrs({
  icon: ICONS.IMPORTANT_EMPTY,
  scale: 1,
  height: 14,
  width: 14,
})``

const HeaderTitle = styled(ContentBoxHeaderTitle)``

const HeaderRight = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`

const Switch = styled(ToggleSwitch)``

const Wrapper = styled(ContentBox)`
  cursor: pointer;
`

export {
  Body,
  Header,
  HeaderIcon,
  HeaderLeft,
  HeaderRight,
  HeaderTitle,
  Switch,
  Wrapper,
}
