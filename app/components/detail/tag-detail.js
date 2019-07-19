import React from 'react'
import PropTypes from 'prop-types'
import { withStateHandlers } from 'recompose'
import {
  tagColor,
  getColorIndex,
  getTagColor,
} from 'redux/utils/component-helper'
import { toast } from 'react-toastify'
import { errorMessages } from 'utils/messages'
import constants from 'utils/constants'
import domUtils from 'redux/utils/dom'

import TextEditor from 'components/editor'
import TagDetailColors from 'components/detail/tag-detail-colors'
import DetailMenu from 'components/detail/detail-menu'
import Icon from 'components/icons/icon'
import { ICONS } from 'components/icons/icon-constants'

import {
  DetailInner,
  DetailContentTop,
  DetailContentSubject,
  DetailSubject,
  DetailSubjectTagColor,
  ContentEditableWrapper,
  DetailSubjectTagContentEditable,
  DetailContentIcon,
  DetailContentCenter,
  DetailContentTagColor,
  DetailTagColorSelector,
  DetailTagColorSelectorLabel,
  DetailContentDescriptionTag,
} from './styles'

const TagDetail = props => {
  const {
    tag,
    tagColorsRef,
    getTagColorsRef,
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

  const colorIndex = getColorIndex(tag.colorIndex, tag.title)
  const color = getTagColor(colorIndex)
  const description = tag.description === null ? '' : tag.description
  const tagColorElem = domUtils.getDimensions(tagColorsRef)
  const offset = tagColorElem ? 143 + tagColorElem.height : 202
  const editorHeight = `calc(100vh - ${offset}px)`
  const scrollStyle = {
    height: `calc(100vh - ${offset + 62}px)`,
    overflow: 'hidden',
  }

  return (
    <div>
      <DetailMenu
        back={onHandleToggleList}
        previous={onHandlePrevious}
        next={onHandleNext}
      />
      <DetailInner>
        <DetailContentTop>
          <DetailContentSubject>
            <DetailSubject>
              <DetailSubjectTagColor
                icon={ICONS.TAG}
                width={37}
                height={20}
                scale={1.81}
                color={[color]}
              />
              <ContentEditableWrapper onClick={onHandleRemoveEventListener}>
                <DetailSubjectTagContentEditable
                  html={tag.title}
                  maxCharacters={20}
                  enforcePlainText
                  onChange={onHandleTitleUpdate}
                  marginLeft="10px"
                  allowed
                />
              </ContentEditableWrapper>
            </DetailSubject>
          </DetailContentSubject>
          <DetailContentIcon onClick={onHandleRemoveEventListener}>
            <Icon
              icon={ICONS.TRASH}
              width={23}
              height={26}
              scale={1}
              color={['#FF6A6A']}
              onClick={onHandleDelete}
            />
          </DetailContentIcon>
        </DetailContentTop>
        <DetailContentCenter column allowed>
          <DetailContentTagColor innerRef={getTagColorsRef}>
            <DetailTagColorSelector>
              <DetailTagColorSelectorLabel>
                Select a color
              </DetailTagColorSelectorLabel>
              <TagDetailColors
                colors={tagColor}
                colorIndex={colorIndex}
                setColor={onHandleSetColor}
              />
            </DetailTagColorSelector>
          </DetailContentTagColor>
          <DetailContentDescriptionTag>
            <span onClick={onHandleRemoveEventListener}>
              <TextEditor
                componentId={tag.id}
                content={description}
                setDescription={onHandleDescriptionUpdate}
                editorHeight={editorHeight}
                scrollStyle={scrollStyle}
              />
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
  windowWidth: PropTypes.number,
  tagColorsRef: PropTypes.object,
  getTagColorsRef: PropTypes.func,
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

export default withStateHandlers(() => ({ tagColorsRef: null }), {
  getTagColorsRef: () => ref => ({ tagColorsRef: ref }),
  onHandleTitleUpdate: (state, props) => event => {
    const title = event.target.value
    const originalTitle = props.tag.title
    const titles = props.titles

    if (originalTitle === title || title === '') {
      return {}
    }

    // Validation of title conflict
    if (titles.includes(title.toLowerCase())) {
      toast.error(errorMessages.tags.titleConflict, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: constants.NOTIFICATION_ERROR_DURATION,
      })
      return {}
    }

    const data = { tag: props.tag, title }
    props.onHandleTagTitleUpdate(data)
    return {}
  },
  onHandleSetColor: (state, props) => index => {
    const data = { tag: props.tag, index }
    props.onHandleTagSetColor(data)
    return {}
  },
  onHandleDelete: (state, props) => () => props.onHandleTagDelete(props.tag),
  onHandleDescriptionUpdate: (state, props) => value => {
    const description = value
    if (description === props.tag.description) {
      return {}
    }

    const data = { tag: props.tag, description }
    props.onHandleTagDescriptionUpdate(data)
    return {}
  },
})(TagDetail)
