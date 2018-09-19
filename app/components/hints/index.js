import React from 'react'
import PropTypes from 'prop-types'
import onClickOutside from 'react-onclickoutside'
import { withHandlers } from 'recompose'
import ShadowScrollbar from '../common/shadow-scrollbar'
import constants from '../../utils/constants'
import { getHintDirectionRender } from '../../redux/utils/component-helper'

import HintItem from './hints-item'

import { HintsContainer, Title, Hint } from './styles'

const getTopHeight = (positionTop, directionRender) => {
  return directionRender === 'topToBottom'
    ? (constants.WINDOW_HEIGHT - positionTop)
    : positionTop
}

const getScroll = (hintsLength, positionTop, directionRender) => {
  const topHeight = getTopHeight(positionTop, directionRender)
  const maxHintsHeight = topHeight - constants.OFFSET
  const hintsHeight = (hintsLength * constants.HINT_HEIGHT) + constants.TITLE_HEIGHT
  return hintsHeight >= maxHintsHeight
}

const getOverflowHeight = (positionTop, directionRender) => {
  const topHeight = getTopHeight(positionTop, directionRender)
  const scrollHeight = topHeight - constants.OFFSET - constants.TITLE_HEIGHT
  return constants.WINDOW_HEIGHT - scrollHeight
}

const Hints = props => {
  const {
    hints,
    dataType,
    position,
    value,
    selectIndex,
    getScrollRef,
    getHintRef,
    onHandleSubmit,
    onHandleMouseOver
  } = props

  const hintsLength = hints[dataType].length
  const condition = hints[dataType].length === 0
  const directionRender = getHintDirectionRender(position.top)
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
    ? <Hint innerRef={ref => getHintRef(ref)} onClick={onHandleSubmit} selected>{value}</Hint>
    : hints[dataType].map((hint, i) => (
      <HintItem
        key={hint.id}
        hint={hint}
        addHintRef={getHintRef}
        index={i}
        dataType={dataType}
        selected={selectIndex === i}
        onSubmit={onHandleSubmit}
        onMouseOver={onHandleMouseOver} />))
  const getRender = {
    topToBottom: (
      <HintsContainer position={{ top: position.top, left: position.left }}>
        <Title directionRender={directionRender}>{title[dataType]}</Title>
        {!isScroll
          ? getItem
          : <ShadowScrollbar
              addScrollRef={getScrollRef}
              style={scrollStyle}>{getItem}</ShadowScrollbar>}
      </HintsContainer>
    ),
    bottomToTop: (
      <HintsContainer position={{
        bottom: (constants.WINDOW_HEIGHT - position.top  + constants.TITLE_HEIGHT),
        left: position.left
      }}>
        {!isScroll
          ? getItem
          : <ShadowScrollbar
              addScrollRef={getScrollRef}
              style={scrollStyle}>{getItem}</ShadowScrollbar>}
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
  addScrollRef: PropTypes.func,
  getScrollRef: PropTypes.func,
  addHintRef: PropTypes.func,
  getHintRef: PropTypes.func,
  onHandleMouseOver: PropTypes.func,
  onHandleClickOutside: PropTypes.func,
  onSubmit: PropTypes.func,
  onHandleSubmit: PropTypes.func,
}

export default withHandlers({
  getScrollRef: props => ref => props.addScrollRef(ref),
  getHintRef: props => ref => props.addHintRef(ref),
  handleClickOutside: props => event => props.onHandleClickOutside(event),
  onHandleMouseOver: props => index => props.onSelectIndex(index),
  onHandleSubmit: props => () => props.onSubmit(),
})(onClickOutside(Hints))
