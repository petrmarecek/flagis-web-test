import React from 'react'
import PropTypes from 'prop-types'
import { withStateHandlers } from 'recompose'
import { markdownToHTML } from '../../redux/utils/component-helper'

/* eslint-disable react/no-danger */

const MarkdownEditable = ({ className, text, editable, onHandleClick, onHandleUpdateText }) => {

  const markdown = markdownToHTML(text)

  let resultComponent = (
    <div
      className={className}
      dangerouslySetInnerHTML={{__html: markdown}}
      onClick={onHandleClick} />
  )

  if (editable) {
    resultComponent = (
      <textarea
        autoFocus
        className={className}
        onBlur={onHandleUpdateText} />
    )
  }

  return resultComponent
}


MarkdownEditable.propTypes = {
  className: PropTypes.string,
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
