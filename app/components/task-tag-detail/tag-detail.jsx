import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'

import {
  deselectTags,
  selectTag,
  updateTag,
} from '../../redux/store/tags/tags.actions'
import {
  getCurrentTag,
  getNextTag,
  getPreviousTag,
} from "../../redux/store/tags/tags.selectors"

import commonUtils from '../../redux/utils/common'
import { getTagColor } from '../../redux/utils/component-helper'

import {
  showDialog,
  deselectDetail
} from "../../redux/store/app-state/app-state.actions"

import ContentEditable from '../common/content-editable'
import Icon from '../icons/icon'
import {ICONS} from '../icons/icon-constants'

class TagDetail extends Component {

  static propTypes = {
    tag: PropTypes.object,
    deselectDetail: PropTypes.func,
    deselectTags: PropTypes.func,
    selectTag: PropTypes.func,
    updateTag: PropTypes.func,
    onDelete: PropTypes.func,
    nextTag: PropTypes.object,
    previousTag: PropTypes.object,
    showDialog: PropTypes.func,
  }

  state = {
    description: this.props.tag.description === null ? '' : this.props.tag.description
  }

  componentDidMount() {
    document.getElementById('page').addEventListener("click", this.handleClickOutSide, false)
    document.addEventListener("keydown", this.handleKeyDown, false)
  }

  componentWillUnmount() {
    document.getElementById('page').removeEventListener("click", this.handleClickOutSide, false)
    document.removeEventListener("keydown", this.handleKeyDown, false)
  }

  componentWillReceiveProps(newProps) {
    if (this.props.tag.id !== newProps.tag.id) {
      this.setState({ description: newProps.tag.description === null ? '' : newProps.tag.description })
    }
  }

  // Back to tag list
  handleToggleTaskList = () => {
    this.props.deselectTags()
  }

  // Previous and next tag
  handleClickOutSide = event => {
    const detail = findDOMNode(this.refs.detail)

    if (!detail.contains(event.target)) {
      document.removeEventListener("keydown", this.handleKeyDown, false)
    }
  }

  handleRemoveEventListener = event => {
    event.stopPropagation()
    document.removeEventListener("keydown", this.handleKeyDown, false)
  }

  handleAddEventListener = () => {
    document.addEventListener("keydown", this.handleKeyDown, false)
  }

  handleKeyDown = event => {
    if (event.repeat) {
      return
    }

    switch (event.which) {

      // escape
      case 27:
        this.props.deselectDetail('tag')
        this.props.deselectTags()
        return

      // backspace
      case 8:
        this.props.deselectDetail('tag')
        this.props.deselectTags()
        return

      // arrow left key
      case 37:
        this.handlePreviousTag()
        return

      // arrow right key
      case 39:
        this.handleNextTag()
        return

      default:
        return
    }
  }

  handleNextTag = () => {
    if (!this.props.nextTag) {
      return
    }

    this.props.selectTag(this.props.nextTag.id)
  }

  handlePreviousTag = () => {
    if (!this.props.previousTag) {
      return
    }

    this.props.selectTag(this.props.previousTag.id)
  }

  // Subject
  handleTitleChange = event => {
    const title = event.target.value
    this.props.updateTag(this.props.tag, title, 'title')
  }

  // Delete tag
  handleDelete = () => {
    this.props.showDialog('tag-delete-confirm', {tag: this.props.tag})
  }

  // Color Select
  handleColorSelect = index => {
    this.props.updateTag(this.props.tag, index, 'colorIndex')
  }

  // Description
  handleDescriptionChange = event => {
    this.setState({ description: event.target.value })
  }

  handleDescriptionUpdate = () => {
    const description = this.state.description
    this.props.updateTag(this.props.tag, description, 'description')
  }

  getColorIndex() {
    return this.props.tag.colorIndex === null
      ? commonUtils.computeIntHash(this.props.tag.title, 10)
      : this.props.tag.colorIndex
  }

  render() {
    // tag not filled
    if (!this.props.tag) {
      return (<div className="detail-dialog-scroll-area" />)
    }

    // render color options
    const colors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
    const colorItems = colors.map(index => {
      const colorClass = `color-selector__item cl-${index}`
      return (
        <li
          key={index}
          className={colorClass}
          onClick={() => this.handleColorSelect(index)} />
      )
    })

    // resolve other properties
    const tagTitle = this.props.tag !== null ? this.props.tag.title : null
    const colorIndex = this.getColorIndex()
    const tagColor = getTagColor(colorIndex)

    return (
      <div
        ref="detail"
        className="detail"
        onClick={this.handleAddEventListener}>
        <div className="detail-menu">
          <div className="detail-menu__left">
            <Icon
              icon={ICONS.DETAIL_BACK}
              width={37}
              height={18}
              color="#8C9DA9"
              hoverColor="#00FFC7"
              onClick={this.handleToggleTaskList}/>
          </div>
          <div className="detail-menu__right">
            <Icon
              icon={ICONS.DETAIL_PREVIOUS}
              width={11}
              height={17}
              color="#8C9DA9"
              hoverColor="#00FFC7"
              onClick={this.handlePreviousTag}/>
            <Icon
              icon={ICONS.DETAIL_NEXT}
              width={11}
              height={17}
              color="#8C9DA9"
              hoverColor="#00FFC7"
              onClick={this.handleNextTag}/>
          </div>
        </div>

        <div className="detail-inner">
          <div className="detail-content detail-content__top">
            <div className="detail-content__subject detail-content__subject--tag detail-subject">
              <Icon
                className="detail-subject__tag-color"
                icon={ICONS.TAG}
                width={37}
                height={20}
                scale={1.81}
                color={tagColor}/>
              <span onClick={this.handleRemoveEventListener}>
                <ContentEditable
                  ref="subject"
                  className="detail-subject__content detail-subject__content--tag"
                  html={tagTitle}
                  enforcePlainText
                  onChange={this.handleTitleChange} />
              </span>
            </div>
            <div className="detail-content__delete">
              <Icon
                icon={ICONS.TRASH}
                width={23}
                height={26}
                scale={1}
                color="#ff8181"
                onClick={this.handleDelete}/>
            </div>
          </div>

          <div className="detail-content detail-content__center detail-content__center--column">
            <div className="detail-content__tag-color">
              <div className="color-selector color-selector__label">
                Select a color
              </div>
              <ul className="color-selector__options">
                {colorItems}
              </ul>
            </div>
            <div className="detail-content__description detail-content__description--tag">
              <textarea
                ref="description"
                onClick={this.handleRemoveEventListener}
                value={this.state.description}
                onChange={this.handleDescriptionChange}
                onBlur={this.handleDescriptionUpdate}
                placeholder="Add a Description" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tag: getCurrentTag(state),
  nextTag: getNextTag(state),
  previousTag: getPreviousTag(state),
})

const mapDispatchToProps = {
  deselectDetail,
  deselectTags,
  selectTag,
  updateTag,
  showDialog,
}

export default connect(mapStateToProps, mapDispatchToProps)(TagDetail)
