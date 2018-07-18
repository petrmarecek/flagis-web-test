import React from 'react'
import PropTypes from 'prop-types'
import { withStateHandlers } from 'recompose'
import { markdownToHTML } from '../../redux/utils/component-helper'
import { Scrollbars } from 'react-custom-scrollbars'

/* eslint-disable react/no-danger */

const MarkdownEditable = props => {
  const { text, placeholder, className, scrollStyle, editable, onHandleClick, onHandleUpdateText } = props

  return (
    <div
      className={className}
      onClick={onHandleClick}>
      {!editable &&
      <Scrollbars style={{...scrollStyle}}>
        <div
          id='markdown-html'
          className='markdown__html'
          data-placeholder={placeholder}
          dangerouslySetInnerHTML={{__html: markdownToHTML(text)}} />
      </Scrollbars>}

      {editable &&
      <textarea
        autoFocus
        className='markdown__edit'
        placeholder={placeholder}
        defaultValue={text}
        onBlur={onHandleUpdateText} />}
    </div>
  )
}

MarkdownEditable.propTypes = {
  text: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  scrollStyle: PropTypes.object,
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
