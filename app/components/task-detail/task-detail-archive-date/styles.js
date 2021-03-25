import styled from 'styled-components'

import { ContentBox, ContentBoxHeader, ContentBoxHeaderTitle } from '../styles'
import { colors } from 'components/styled-components-mixins/colors'

const Wrapper = styled(ContentBox)``
const Header = styled(ContentBoxHeader)``
const HeaderTitle = styled(ContentBoxHeaderTitle)`
  color: ${colors.darkJungleGreen};
`

export { Wrapper, Header, HeaderTitle }
