import React from 'react'
import PropTypes from 'prop-types'
import { withStateHandlers } from 'recompose'
import { markdownToHTML } from '../../redux/utils/component-helper'
import { Scrollbars } from 'react-custom-scrollbars'
import Linkify from 'react-linkify'

import styled from 'styled-components'
import {
  fontMain,
  borderRadius,
  markdownStyles,
} from 'components/styled-components-mixins'

/* eslint-disable react/no-danger */

const Help = styled.span`
  ${fontMain}
  font-size: 12px;
  color: #a2a2a2;
  position: absolute;
  right: 0;
  top: 0;
  padding: 4px;
  background-color: #e1e4e5;
  cursor: pointer;
  ${borderRadius('0 0 0 10px')}
`

const HelpInfo = styled.span`
  position: absolute;
  right: 12px;
  top: 19px;
  padding: 10px;
  background-color: #e1e4e5;
  ${borderRadius('4px')}
  ${markdownStyles}
`

const MarkdownEditable = props => {
  const {
    text,
    placeholder,
    className,
    scrollStyle,
    editable,
    helpVisible,
    helpInfoVisible,
    onHandleClick,
    onHandleUpdateText,
    onHandleMouseEnterHelp,
    onHandleMouseLeaveHelp,
  } = props

  return (
    <div className={className} onClick={onHandleClick}>
      {!editable && (
        <Scrollbars style={{ ...scrollStyle }}>
          <div
            id="markdown-html"
            className="markdown__html"
            data-placeholder={placeholder}
            dangerouslySetInnerHTML={{ __html: markdownToHTML(text) }}
          />
        </Scrollbars>
      )}

      {editable && (
        <textarea
          autoFocus
          className="markdown__edit"
          placeholder={placeholder}
          defaultValue={text}
          onBlur={onHandleUpdateText}
        />
      )}
      {helpVisible && (
        <Help
          onMouseEnter={onHandleMouseEnterHelp}
          onMouseLeave={onHandleMouseLeaveHelp}
        >
          ?
        </Help>
      )}
      {helpInfoVisible && (
        <HelpInfo>
          <div>
            <h3>Markdown syntax:</h3>
            <p>
              First level headline: <code># first headline</code>
            </p>

            <p>
              Second level headline: <code>## second headline</code>
            </p>

            <p>
              Bold text: <code>**bold**</code>
            </p>

            <p>
              Italic text: <code>*italic*</code>
            </p>

            <p>
              Line code: <code>`code`</code>
            </p>

            <p>Multiline code:</p>
            <pre>
              <code>
                ```
                <br />
                multiline
                <br />
                code
                <br />
                ```
              </code>
            </pre>

            <p>Lists:</p>
            <pre>
              <code>
                - first item
                <br />- second item
              </code>
            </pre>

            <p>Links:</p>
            <pre>
              <code>
                {String('<')}http://www.google.com/{String('>')}
                <br />
                --------------------------------
                <br />
                [google][]
                <br />
                [google]: http://www.google.com/
              </code>
            </pre>

            <p>
              More:{' '}
              <Linkify properties={{ target: '_blank' }}>
                http://demo.showdownjs.com/
              </Linkify>
            </p>
          </div>
        </HelpInfo>
      )}
    </div>
  )
}

MarkdownEditable.defaultProps = {
  helpVisible: true,
}

MarkdownEditable.propTypes = {
  text: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  scrollStyle: PropTypes.object,
  editable: PropTypes.bool,
  helpVisible: PropTypes.bool,
  helpInfoVisible: PropTypes.bool,
  onHandleClick: PropTypes.func,
  onUpdate: PropTypes.func,
  onHandleUpdateText: PropTypes.func,
  onHandleMouseEnterHelp: PropTypes.func,
  onHandleMouseLeaveHelp: PropTypes.func,
}

export default withStateHandlers(
  () => ({ editable: false, helpInfoVisible: false }),
  {
    onHandleClick: () => event => {
      if (event.target.nodeName === 'A') {
        return { editable: false }
      }

      return { editable: true }
    },
    onHandleUpdateText: (state, props) => event => {
      props.onUpdate(event)
      return { editable: false }
    },
    onHandleMouseEnterHelp: () => () => ({ helpInfoVisible: true }),
    onHandleMouseLeaveHelp: () => () => ({ helpInfoVisible: false }),
  }
)(MarkdownEditable)
