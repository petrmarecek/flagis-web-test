import styled from 'styled-components'

import {
  ContentBox,
  ContentBoxHeader,
  ContentBoxHeaderLeft,
  ContentBoxHeaderTitle,
  ContentBoxBody,
  ContentBoxHeaderLock,
  ContentBoxHeaderLockIcon,
} from '../styles'
import { placeholderColor } from 'components/styled-components-mixins'
import { colors } from 'components/styled-components-mixins/colors'

const Body = styled(ContentBoxBody)`
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 2px 9px 8px;
`

const Header = styled(ContentBoxHeader)``

const HeaderLeft = styled(ContentBoxHeaderLeft)``

const HeaderTitle = styled(ContentBoxHeaderTitle)``

const HeaderLock = styled(ContentBoxHeaderLock)``

const HeaderLockIcon = styled(ContentBoxHeaderLockIcon)``

const Wrapper = styled(ContentBox)`
  &:hover {
    box-shadow: 1px 2px 9px rgba(214, 214, 214, 0.5);

    input {
      ${placeholderColor(colors.darkJungleGreen)}
    }
  }
`

export {
  Body,
  Header,
  HeaderLeft,
  HeaderLock,
  HeaderLockIcon,
  HeaderTitle,
  Wrapper,
}
