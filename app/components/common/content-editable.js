import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers, withStateHandlers } from 'recompose'
import styled from 'styled-components'

const Editable = styled.div`
  cursor: text;
`

/* eslint-disable react/no-danger */

const ContentEditable = ({
  html,
  placeholder,
  className,
  getEditableRef,
  onHandleUpdateText,
  onHandleKeyDown,
}) => (
  <Editable
    innerRef={getEditableRef}
    className={className}
    onBlur={onHandleUpdateText}
    onKeyDown={onHandleKeyDown}
    data-placeholder={placeholder}
    contentEditable="true"
    dangerouslySetInnerHTML={{ __html: html }}
  />
)

ContentEditable.propTypes = {
  html: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  maxCharacters: PropTypes.number,
  enforcePlainText: PropTypes.bool,
  editableRef: PropTypes.object,
  getEditableRef: PropTypes.func,
  onChange: PropTypes.func,
  stripHtmlTags: PropTypes.func,
  makePlainText: PropTypes.func,
  onHandleUpdateText: PropTypes.func,
  onHandleKeyDown: PropTypes.func,
}

export default compose(
  withHandlers({
    stripHtmlTags: () => value => {
      const tmp = document.createElement('DIV')
      tmp.innerHTML = value
      return tmp.textContent || tmp.innerText || ''
    },
  }),
  withHandlers({
    makePlainText: props => value =>
      props.stripHtmlTags(value).replace(/[#*\n]/gi, ''),
  }),
  withHandlers({
    onHandleUpdateText: props => event => {
      let value = event.target.innerHTML

      // make plain text
      if (props.enforcePlainText) {
        value = props.makePlainText(value)
      }

      // update max characters of text
      if (value.length > props.maxCharacters) {
        value = value.substr(0, props.maxCharacters)
      }

      // update text
      event.target = { value }
      props.onChange(event)
    },
  }),
  withStateHandlers(() => ({ editableRef: null }), {
    getEditableRef: () => ref => ({ editableRef: ref }),
    onHandleKeyDown: ({ editableRef }, props) => event => {
      // backspace, shift, ctrl, alt, delete, arrows left, up, right, down
      const specialCharacters = [8, 16, 17, 18, 46, 37, 38, 39, 40]
      const selection = window.getSelection()
      const isSpecial = specialCharacters.includes(event.which)
      let isSelection = false
      let value = event.target.innerHTML

      // press enter => update text
      if (event.which === 13) {
        editableRef.blur()
      }

      // selection text
      if (selection) {
        isSelection = Boolean(selection.toString())
      }

      // press special keys => dont update text
      if (isSpecial || isSelection) {
        return {}
      }

      // make plain text
      if (props.enforcePlainText) {
        value = props.makePlainText(value)
      }

      // control max characters of text
      if (value.length >= props.maxCharacters) {
        event.preventDefault()
        return {}
      }

      return {}
    },
  })
)(ContentEditable)
