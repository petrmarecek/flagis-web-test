import React from 'react'
import PropTypes from 'prop-types'
import { withStateHandlers } from 'recompose'
import { markdownToHTML } from '../../redux/utils/component-helper'
import { Markdown, Html } from './styles'

/* eslint-disable react/no-danger */

const MarkdownEditable = ({ text, editable, onHandleClick, onHandleUpdateText }) => {

  const markdown = markdownToHTML(text)

  let resultComponent = (
    <Html
      defaultValue={markdown}
      dangerouslySetInnerHTML={{__html: markdown}}
      onClick={onHandleClick} />
  )

  if (editable) {
    resultComponent = (
      <Markdown
        autoFocus
        defaultValue={text}
        onBlur={onHandleUpdateText} />
    )
  }

  return resultComponent
}


MarkdownEditable.propTypes = {
  text: PropTypes.string,
  editable: PropTypes.bool,
  onHandleClick: PropTypes.func,
  onHandleUpdateText: PropTypes.func,
  onUpdate: PropTypes.func,
}

export default withStateHandlers(
  () => ({
    editable: false,
  }),
  {
    onHandleClick: () => () => ({ editable: true }),
    onHandleUpdateText: (state, props) => event => {
      props.onUpdate(event)
      return { editable: false }
    },
  },
)(MarkdownEditable)
