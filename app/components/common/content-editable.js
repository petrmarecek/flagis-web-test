import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers } from 'recompose'

/* eslint-disable react/no-danger */

const ContentEditable = ({ html, placeholder, className, onHandleUpdateText }) => (
  <div
    className={className}
    onBlur={onHandleUpdateText}
    data-placeholder={placeholder}
    contentEditable="true"
    dangerouslySetInnerHTML={{__html: html}} />
)

ContentEditable.propTypes = {
  html: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  enforcePlainText: PropTypes.bool,
  onChange: PropTypes.func,
  stripHtmlTags: PropTypes.func,
  makePlainText: PropTypes.func,
  onHandleUpdateText: PropTypes.func,
}

export default compose(
  withHandlers({
    stripHtmlTags: () => value => {
      const tmp = document.createElement('DIV')
      tmp.innerHTML = value
      return tmp.textContent || tmp.innerText || ''
    }
  }),
  withHandlers({
    makePlainText: props => value => props.stripHtmlTags(value).replace(/[#*\n]/gi, '')
  }),
  withHandlers({
    onHandleUpdateText: props => event => {
      let value = event.target.innerHTML

      if (props.enforcePlainText) {
        value = props.makePlainText(value)
      }

      event.target = {value: value}
      props.onChange(event)

    }
  })
)(ContentEditable)
