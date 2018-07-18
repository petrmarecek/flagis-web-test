import React from 'react'
import PropTypes from 'prop-types'
import { withHandlers } from 'recompose'
import { getTagColor } from 'redux/utils/component-helper'
import commonUtils from 'redux/utils/common'
import { toast } from 'react-toastify'
import { errorMessages } from 'utils/messages'
import constants from 'utils/constants'

import DetailMenu from 'components/detail/detail-menu'
import Icon from 'components/icons/icon'
import { ICONS } from 'components/icons/icon-constants'

import {
  DetailInner,
  DetailContentTop,
  DetailContentSubject,
  DetailSubject,
  DetailSubjectTagColor,
  DetailSubjectTagContentEditable,
  DetailContentDeleteIcon,
  DetailContentCenter,
  DetailContentTagColor,
  DetailTagColorSelector,
  DetailTagColorSelectorLabel,
  DetailTagColorSelectorOptions,
  DetailContentDescriptionTag,
  MarkdownEditableContainer,
} from './styles'

const TagDetail = props => {

  const {
    tag,
    onHandleTitleUpdate,
    onHandleSetColor,
    onHandleDelete,
    onHandleDescriptionUpdate,
    onHandleRemoveEventListener,
    onHandleToggleList,
    onHandleNext,
    onHandlePrevious,
  } = props

  if (!tag) {
    return <div>Detail not found</div>
  }

  const getColorIndex = () => {
    return tag.colorIndex === null
      ? commonUtils.computeIntHash(tag.title, 10)
      : tag.colorIndex
  }

  const scrollStyle = {
    height: 'calc(100vh - 294px)',
    overflow: 'hidden',
  }

  const colorIndex = getColorIndex()
  const tagColor = getTagColor(colorIndex)
  const description = tag.description === null ? '' : tag.description
  const colors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  const colorItems = colors.map(index => {
    const colorClass = `color-selector__item cl-${index}`
    return (
      <li
        key={index}
        className={colorClass}
        onClick={() => onHandleSetColor(index)} />
    )
  })

  return (
    <div>
      <DetailMenu
        back={onHandleToggleList}
        previous={onHandlePrevious}
        next={onHandleNext} />

      <DetailInner>
        <DetailContentTop>
          <DetailContentSubject>
            <DetailSubject>
              <DetailSubjectTagColor
                icon={ICONS.TAG}
                width={37}
                height={20}
                scale={1.81}
                color={[tagColor]}/>
              <span onClick={onHandleRemoveEventListener}>
                <DetailSubjectTagContentEditable
                  html={tag.title}
                  enforcePlainText
                  onChange={onHandleTitleUpdate} />
              </span>
            </DetailSubject>
          </DetailContentSubject>
          <DetailContentDeleteIcon onClick={onHandleRemoveEventListener}>
            <Icon
              icon={ICONS.TRASH}
              width={23}
              height={26}
              scale={1}
              color={["#ff8181", "#ff8181", "#ff8181", "#ff8181"]}
              onClick={onHandleDelete}/>
          </DetailContentDeleteIcon>
        </DetailContentTop>

        <DetailContentCenter column>
          <DetailContentTagColor>
            <DetailTagColorSelector>
              <DetailTagColorSelectorLabel>
                Select a color
              </DetailTagColorSelectorLabel>
              <DetailTagColorSelectorOptions>
                {colorItems}
              </DetailTagColorSelectorOptions>
            </DetailTagColorSelector>
          </DetailContentTagColor>
          <DetailContentDescriptionTag>
            <span onClick={onHandleRemoveEventListener}>
              <MarkdownEditableContainer
                text={description}
                scrollStyle={scrollStyle}
                placeholder='Add description'
                onUpdate={onHandleDescriptionUpdate} />
            </span>
          </DetailContentDescriptionTag>
        </DetailContentCenter>
      </DetailInner>
    </div>
  )
}

TagDetail.propTypes = {
  tag: PropTypes.object,
  titles: PropTypes.object,
  onHandleTitleUpdate: PropTypes.func,
  onHandleTagTitleUpdate: PropTypes.func,
  onHandleSetColor: PropTypes.func,
  onHandleTagSetColor: PropTypes.func,
  onHandleDelete: PropTypes.func,
  onHandleTagDelete: PropTypes.func,
  onHandleDescriptionUpdate: PropTypes.func,
  onHandleTagDescriptionUpdate: PropTypes.func,
  onHandleRemoveEventListener: PropTypes.func,
  onHandleToggleList: PropTypes.func,
  onHandleNext: PropTypes.func,
  onHandlePrevious: PropTypes.func,
}

export default withHandlers({
  onHandleTitleUpdate: props => event => {
    const title = event.target.value
    const originalTitle = props.tag.title
    const titles = props.titles

    if (originalTitle === title || title === '') {
      return
    }

    // Validation of title conflict
    if (titles.includes(title)) {
      toast.error(errorMessages.tags.titleConflict, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: constants.NOTIFICATION_ERROR_DURATION,
      })
      return
    }

    const data = { tag: props.tag, title }
    props.onHandleTagTitleUpdate(data)
  },
  onHandleSetColor: props => index => {
    const data = { tag: props.tag, index }
    props.onHandleTagSetColor(data)
  },
  onHandleDelete: props => () => props.onHandleTagDelete(props.tag),
  onHandleDescriptionUpdate: props => event => {
    const description = event.target.value
    if (description === props.tag.description) {
      return
    }

    const data = { tag: props.tag, description }
    props.onHandleTagDescriptionUpdate(data)
  },
})(TagDetail)
