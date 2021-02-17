import styled from 'styled-components'

import { ICONS } from '../../icons/icon-constants'

import {
  ContentBox,
  ContentBoxHeader,
  ContentBoxHeaderIcon,
  ContentBoxHeaderLeft,
  ContentBoxHeaderTitle,
} from '../styles'
import { colors } from 'components/styled-components-mixins/colors'

const Header = styled(ContentBoxHeader)``

const HeaderLeft = styled(ContentBoxHeaderLeft)``

const HeaderIcon = styled(ContentBoxHeaderIcon).attrs({
  color: colors.darkJungleGreen,
  icon: ICONS.PIN,
  scale: 1.15,
  height: 15,
  width: 14,
})``

const HeaderTitle = styled(ContentBoxHeaderTitle)`
  color: ${colors.darkJungleGreen};
`

const Wrapper = styled(ContentBox)`
  background-color: ${colors.snowflake};
  cursor: pointer;

  :hover {
    background-color: ${colors.coldWind};
  }
`

export { Header, HeaderLeft, HeaderIcon, HeaderTitle, Wrapper }
