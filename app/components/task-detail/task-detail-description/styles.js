import styled from 'styled-components'

import { ContentBox } from 'components/task-detail/styles'
import { MarkdownEditor } from '../../editor/markdown-editor'

const MarkdownEditableContainer = styled(MarkdownEditor)`
  & .tui-editor-defaultUI {
    border: 0 !important;
  }
`

const Wrapper = styled(ContentBox)``

export {
  MarkdownEditableContainer,
  Wrapper,
}
