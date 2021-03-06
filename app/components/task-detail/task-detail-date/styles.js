import styled from 'styled-components'

import Button from '../../common/button'
import Icon from '../../icons/icon'
import { ICONS } from 'components/icons/icon-constants'
import {
  ContentBox,
  ContentBoxBody,
  ContentBoxBodyText,
  ContentBoxHeader,
  ContentBoxHeaderIcon,
  ContentBoxHeaderLeft,
  ContentBoxHeaderLock,
  ContentBoxHeaderLockIcon,
  ContentBoxHeaderTitle,
} from '../styles'
import { colors } from 'components/styled-components-mixins/colors'

const Body = styled(ContentBoxBody)`
  padding: 0 9px 8px 33px;
`

const BodyText = styled(ContentBoxBodyText)``

const BodyClear = styled(Button)`
  width: 15px;
  height: 15px;

  border: 1px solid ${colors.batman};
  border-radius: 7px;
  box-sizing: border-box;
  padding-left: 3px;
`

const BodyClearIcon = styled(Icon).attrs({
  color: [colors.batman],
  icon: ICONS.CROSS_SIMPLE,
  scale: 0.5,
  width: 10,
  height: 10,
})``

const Header = styled(ContentBoxHeader)``

const HeaderLeft = styled(ContentBoxHeaderLeft)``

const HeaderIcon = styled(ContentBoxHeaderIcon).attrs({
  scale: 1,
  height: 14,
  width: 17,
})``

const HeaderTitle = styled(ContentBoxHeaderTitle)``

const HeaderLock = styled(ContentBoxHeaderLock)``

const HeaderLockIcon = styled(ContentBoxHeaderLockIcon)``

const Wrapper = styled(ContentBox)`
  :hover {
    ${HeaderTitle} {
      color: ${colors.darkJungleGreen};
    }
  }
`

export {
  Body,
  BodyClear,
  BodyClearIcon,
  BodyText,
  Header,
  HeaderLeft,
  HeaderLock,
  HeaderLockIcon,
  HeaderIcon,
  HeaderTitle,
  Wrapper,
}
