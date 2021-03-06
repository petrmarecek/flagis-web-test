import styled from 'styled-components'

import Button from '../../common/button'

// components
import Autocomplete from 'components/autocomplete'
import Icon from '../../icons/icon'
import { ICONS } from '../../icons/icon-constants'

// styles
import {
  ContentBox,
  ContentBoxHeader,
  ContentBoxHeaderLeft,
  ContentBoxHeaderLock,
  ContentBoxHeaderLockIcon,
  ContentBoxHeaderTitle,
  ContentBoxBody,
} from '../styles'
import {
  transition,
  placeholderColor,
} from 'components/styled-components-mixins'
import { colors } from 'components/styled-components-mixins/colors'

const Body = styled(ContentBoxBody)`
  ${props => (props.flexEnd ? 'justify-content: flex-end' : null)};

  padding: 0 7px 9px 47px;
`

const BodyStatus = styled.span`
  font-size: 10px;
  line-height: 12px;
  text-transform: uppercase;
  color: ${colors.batman};
`

const BodyButton = styled(Button)`
  background-color: ${props => {
    if (props.green) {
      return colors.drunkenDragonfly
    }

    if (props.red) {
      return colors.crystalBell
    }

    return colors.coveredInPlatinum
  }};
  margin: 0 0 0 10px;
  padding: 5px 20px;
  border-radius: 4px;

  font-size: 13px;
  font-weight: 500;
  line-height: 15px;
  color: ${props => (props.red ? colors.pompelmo : colors.white)};

  :hover {
    ${transition('500ms')};
    background-color: ${props =>
      props.red ? colors.pompelmo : colors.hanumanGreen};
    color: #fff;
  }
`

const Header = styled(ContentBoxHeader)`
  height: 46px;
`

const HeaderLeft = styled(ContentBoxHeaderLeft)`
  width: auto;
  min-width: 40px;
`

const HeaderTitle = styled(ContentBoxHeaderTitle)`
  ${props => (props.withContact ? 'color: #1C2124 !important' : null)};
`

const HeaderAutocomplete = styled(Autocomplete)``

const HeaderTitleName = styled.span`
  font-weight: 500;
`

const HeaderLock = styled(ContentBoxHeaderLock)``

const HeaderLockIcon = styled(ContentBoxHeaderLockIcon)``

const HeaderDelete = styled(Button)`
  width: 15px;
  height: 15px;

  border: 1px solid ${colors.batman};
  border-radius: 7px;
  box-sizing: border-box;
  padding: 1px 0 0 3px;
`

const HeaderDeleteIcon = styled(Icon).attrs({
  color: [colors.batman],
  icon: ICONS.CROSS_SIMPLE,
  scale: 0.5,
  width: 10,
  height: 10,
})``

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
  BodyButton,
  BodyStatus,
  Header,
  HeaderAutocomplete,
  HeaderLeft,
  HeaderTitle,
  HeaderLock,
  HeaderLockIcon,
  HeaderDelete,
  HeaderDeleteIcon,
  HeaderTitleName,
  Wrapper,
}
