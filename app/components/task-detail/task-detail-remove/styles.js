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
import { transition } from 'components/styled-components-mixins'
import { colors } from 'components/styled-components-mixins/colors'

const Body = styled(ContentBoxBody)``

const Header = styled(ContentBoxHeader)``

const HeaderLeft = styled(ContentBoxHeaderLeft)``

const HeaderIcon = styled(ContentBoxHeaderIcon).attrs({
  color: [colors.pompelmo],
  icon: ICONS.TRASH,
  scale: 0.56,
  height: 14,
  width: 13,
})``

const HeaderTitle = styled(ContentBoxHeaderTitle)`
  color: ${colors.pompelmo};
`

const Wrapper = styled(ContentBox)`
  ${transition('150ms ease-in-out')}
  cursor: pointer;

  :hover {
    background: ${colors.pompelmo};

    svg {
      path {
        ${transition('150ms ease-in-out')}
        fill: ${colors.white};
      }
    }

    ${HeaderTitle} {
      ${transition('150ms ease-in-out')}
      color: ${colors.white};
    }
  }
`

export { Body, Header, HeaderIcon, HeaderLeft, HeaderTitle, Wrapper }
