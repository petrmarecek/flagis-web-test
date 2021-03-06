import React from 'react'
import PropTypes from 'prop-types'
import { withStateHandlers } from 'recompose'
import domUtils from 'redux/utils/dom'
import constants from 'utils/constants'
import { titles as headTitles } from 'components/head-title/head-title-common'
import {
  tagColor,
  getColorIndex,
  getTagColor,
} from 'redux/utils/component-helper'
import * as userAgent from 'utils/userAgent'

// toast notifications
import toast from 'utils/toastify-helper'
import * as toastCommon from 'components/toast-notifications/toast-notifications-common'

// components
import HeadTitle from 'components/head-title'
import { MarkdownEditor } from 'components/editor/markdown-editor'
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
    leftPanelWidth,
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
  const deviceOffset = userAgent.isTablet ? 75 : 0
  const editorHeight = `calc(100vh - ${offset + deviceOffset}px)`
  const scrollStyle = {
    width: `calc(100vw - ${leftPanelWidth + 84}px)`,
    height: `calc(100vh - ${offset + 62}px)`,
    overflow: 'hidden',
  }

  return (
    <div>
      <HeadTitle title={`${headTitles.TAG_DETAIL} ${tag.title}`} />
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
                  maxCharacters={constants.TAGS_TITLE_MAX_CHARACTERS}
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
              title="Delete"
            />
          </DetailContentIcon>
        </DetailContentTop>
        <DetailContentCenter column allowed>
          <DetailContentTagColor ref={getTagColorsRef}>
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
            <div onClick={onHandleRemoveEventListener}>
              <MarkdownEditor
                componentId={tag.id}
                content={description}
                setDescription={onHandleDescriptionUpdate}
                editorHeight={editorHeight}
                scrollStyle={scrollStyle}
                disabled={false}
                view="simple"
              />
            </div>
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
  leftPanelWidth: PropTypes.number,
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

    // Get tag titles without edited tag
    const titles = props.titles.filter(
      value => value !== originalTitle.toLowerCase()
    )

    if (originalTitle === title || title === '') {
      return {}
    }

    // Validation of title conflict
    if (titles.includes(title.toLowerCase())) {
      toast.error(toastCommon.errorMessages.tags.titleConflict, {
        position: toastCommon.position.DEFAULT,
        autoClose: toastCommon.duration.ERROR_DURATION,
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
