import React from 'react'
import PropTypes from 'prop-types'
import onClickOutside from 'react-onclickoutside'
import { withHandlers } from 'recompose'
import ShadowScrollbar from '../common/shadow-scrollbar'

import { HintsContainer, Title, Hint } from './styles'

import HintItem from './hints-item'

const HINT_HEIGHT = 26
const TITLE_HEIGHT = 30
const WINDOW_HEIGHT = window.innerHeight
const OFFSET = 100
const MIN_HINTS_HEIGHT = 200

const getDirectionRender = positionTop => {
  const topHeight = WINDOW_HEIGHT - positionTop
  const maxHintsHeight = topHeight - OFFSET
  return maxHintsHeight <= MIN_HINTS_HEIGHT ? 'bottomToTop' : 'topToBottom'
}

const getTopHeight = (positionTop, directionRender) => {
  return directionRender === 'topToBottom'
    ? (WINDOW_HEIGHT - positionTop)
    : positionTop
}

const getScroll = (hintsLength, positionTop, directionRender) => {
  const topHeight = getTopHeight(positionTop, directionRender)
  const maxHintsHeight = topHeight - OFFSET
  const hintsHeight = (hintsLength * HINT_HEIGHT) + TITLE_HEIGHT
  return hintsHeight >= maxHintsHeight
}

const getOverflowHeight = (positionTop, directionRender) => {
  const topHeight = getTopHeight(positionTop, directionRender)
  const scrollHeight = topHeight - OFFSET - TITLE_HEIGHT
  return WINDOW_HEIGHT - scrollHeight
}

const Hints = ({ hints, dataType, position, value, selectIndex, onHandleSubmit, onHandleMouseOver }) => {
  const hintsLength = hints[dataType].length
  const condition = hints[dataType].length === 0
  const directionRender = getDirectionRender(position.top)
  const isScroll = getScroll(hintsLength, position.top, directionRender)
  const overflowHeight = getOverflowHeight(position.top, directionRender)
  const scrollStyle = {
    height: `calc(100vh - ${overflowHeight}px)`,
    shadowHeight: 20,
    boxShadowTop: 'inset 0 10px 10px -5px #fafafa',
    boxShadowBottom: 'inset 0 -10px 10px -5px #fafafa',
    overflow: 'hidden'
  }

  const title = {
    tags: condition ? 'Create a new tag' : 'Select existing tag',
    contacts: condition ? 'Create a new contact' : 'Select existing contact'
  }
  const getItem = condition
    ? <Hint onClick={onHandleSubmit} selected>{value}</Hint>
    : hints[dataType].map((hint, i) => (
      <HintItem
        key={hint.id}
        hint={hint}
        index={i}
        dataType={dataType}
        selected={selectIndex === i}
        onSubmit={onHandleSubmit}
        onMouseOver={onHandleMouseOver} />
    ))

  const getRender = {
    topToBottom: (
      <HintsContainer position={{ top: position.top, left: position.left }}>
        <Title directionRender={directionRender}>{title[dataType]}</Title>
        {!isScroll
          ? getItem
          : <ShadowScrollbar style={scrollStyle}>{getItem}</ShadowScrollbar>}
      </HintsContainer>
    ),
    bottomToTop: (
      <HintsContainer position={{
        bottom: (WINDOW_HEIGHT - position.top  + TITLE_HEIGHT),
        left: position.left
      }}>
        {!isScroll
          ? getItem
          : <ShadowScrollbar style={scrollStyle}>{getItem}</ShadowScrollbar>}
        <Title directionRender={directionRender}>{title[dataType]}</Title>
      </HintsContainer>
    )
  }

  return getRender[directionRender]
}

Hints.propTypes = {
  hints: PropTypes.object,
  dataType: PropTypes.string,
  position: PropTypes.object,
  value: PropTypes.string,
  selectIndex: PropTypes.number,
  onSelectIndex: PropTypes.func,
  onHandleMouseOver: PropTypes.func,
  onHandleClickOutside: PropTypes.func,
  onSubmit: PropTypes.func,
  onHandleSubmit: PropTypes.func,
}

export default withHandlers({
  handleClickOutside: props => event => props.onHandleClickOutside(event),
  onHandleMouseOver: props => index => props.onSelectIndex(index),
  onHandleSubmit: props => () => props.onSubmit(),
})(onClickOutside(Hints))
