import React from 'react'
import PropTypes from 'prop-types'
import { withStateHandlers } from 'recompose'
import { markdownToHTML } from '../../redux/utils/component-helper'
import styled, { css } from 'styled-components'
import { boxSizing } from './styled-component-mixins'

const styles = css`
  ${boxSizing('border-box')}
  font-family: 'Source Sans Pro', 'Segoe UI', sans-serif;
  font-weight: 300;
  width: 100%;
  padding: 15px;
  background-color: #fff;
  border: 1px solid #D7E3EC;
  font-size: 14px;
  color: '#293034';
  min-height: 190px;
  max-height: 100%;
  height: auto;
`;

const Markdown = styled.textarea`
  ${styles}
  resize: vertical;
`;

const Html = styled.div`
  ${styles}
  color: ${props => props.defaultValue === '<p>Add description</p>' ? '#8c9da9' : '#293034' };
`;

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
