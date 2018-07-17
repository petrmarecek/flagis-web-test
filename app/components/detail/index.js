import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, lifecycle, withHandlers } from 'recompose'
import { DetailStyle } from './styles'

import TaskDetail from './task-detail'
import TagDetail from './tag-detail'
import ArchiveDetail from './archive-detail'
import ContactDetail from './contact-detail'

import { deselectDetail, showDialog } from 'redux/store/app-state/app-state.actions'
import {
  deselectTags,
  selectTag,
  updateTag,
} from 'redux/store/tags/tags.actions'
import {
  selectContact,
  deselectContacts,
  updateContact
} from 'redux/store/contacts/contacts.actions'

import { getDetail } from 'redux/store/app-state/app-state.selectors'
import {
  getCurrentTag,
  getNextTag,
  getPreviousTag,
  getTagsTitle,
} from 'redux/store/tags/tags.selectors'
import {
  getCurrentContact,
  getNextContact,
  getPreviousContact
} from 'redux/store/contacts/contacts.selectors'

const Detail = props => {

  const {
    detail,

    tag,
    titles,
    onHandleTagTitleUpdate,
    onHandleTagSetColor,
    onHandleTagDelete,
    onHandleTagDescriptionUpdate,

    contact,
    onHandleContactNicknameUpdate,
    onHandleContactDelete,
    onHandleContactDescriptionUpdate,

    onHandleAddEventListener,
    onHandleRemoveEventListener,
    onHandleToggleList,
    onHandleNext,
    onHandlePrevious,
  } = props

  return (
    <DetailStyle
      innerRef={comp => { this.detail = comp }}
      onClick={onHandleAddEventListener}>

      {detail.task &&
      <TaskDetail />}

      {detail.tag &&
      <TagDetail
        tag={tag}
        titles={titles}
        onHandleRemoveEventListener={onHandleRemoveEventListener}
        onHandleToggleList={onHandleToggleList}
        onHandleNext={onHandleNext}
        onHandlePrevious={onHandlePrevious}
        onHandleTagTitleUpdate={onHandleTagTitleUpdate}
        onHandleTagSetColor={onHandleTagSetColor}
        onHandleTagDelete={onHandleTagDelete}
        onHandleTagDescriptionUpdate={onHandleTagDescriptionUpdate} />}

      {detail.archive &&
      <ArchiveDetail />}

      {detail.contact &&
      <ContactDetail
        contact={contact}
        onHandleRemoveEventListener={onHandleRemoveEventListener}
        onHandleToggleList={onHandleToggleList}
        onHandleNext={onHandleNext}
        onHandlePrevious={onHandlePrevious}
        onHandleContactNicknameUpdate={onHandleContactNicknameUpdate}
        onHandleContactDelete={onHandleContactDelete}
        onHandleContactDescriptionUpdate={onHandleContactDescriptionUpdate} />}

    </DetailStyle>
  )
}

Detail.propTypes = {
  detail: PropTypes.object,

  tag: PropTypes.object,
  titles: PropTypes.object,
  onHandleTagTitleUpdate: PropTypes.func,
  onHandleTagSetColor: PropTypes.func,
  onHandleTagDelete: PropTypes.func,
  onHandleTagDescriptionUpdate: PropTypes.func,

  contact: PropTypes.object,
  onHandleContactNicknameUpdate: PropTypes.func,
  onHandleContactDelete: PropTypes.func,
  onHandleContactDescriptionUpdate: PropTypes.func,

  onHandleKeyDown: PropTypes.func,
  onHandleAddEventListener: PropTypes.func,
  onHandleRemoveEventListener: PropTypes.func,
  onHandleClickOutSide: PropTypes.func,
  onHandleToggleList: PropTypes.func,
  onHandleNext: PropTypes.func,
  onHandlePrevious: PropTypes.func,
}

const mapStateToProps = state => ({
  detail: getDetail(state),

  tag: getCurrentTag(state),
  titles: getTagsTitle(state),
  nextTag: getNextTag(state),
  previousTag: getPreviousTag(state),

  contact: getCurrentContact(state),
  nextContact: getNextContact(state),
  previousContact: getPreviousContact(state),
})

const mapDispatchToProps = {
  selectTag,
  deselectTags,
  updateTag,

  selectContact,
  deselectContacts,
  updateContact,

  deselectDetail,
  showDialog,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onHandleToggleList: props => () => {
      if (props.detail.task) {
        return
      }

      if (props.detail.tag) {
        props.deselectTags()
        return
      }

      if (props.detail.archive) {
        return
      }

      props.deselectContacts()
    },
    onHandleNext: props => () => {
      if (props.detail.task) {
        return
      }

      if (props.detail.tag) {
        if (!props.nextTag) {
          return
        }

        props.selectTag(props.nextTag.id)
        return
      }

      if (props.detail.archive) {
        return
      }

      if (!props.nextContact) {
        return
      }

      props.selectContact(props.nextContact.id)
    },
    onHandlePrevious: props => () => {
      if (props.detail.task) {
        return
      }

      if (props.detail.tag) {
        if (!props.previousTag) {
          return
        }

        props.selectTag(props.previousTag.id)
        return
      }

      if (props.detail.archive) {
        return
      }

      if (!props.previousContact) {
        return
      }

      props.selectContact(props.previousContact.id)
    },

    onHandleTagTitleUpdate: props => data =>
      props.updateTag(data.tag, data.title, 'title'),
    onHandleTagSetColor: props => data =>
      props.updateTag(data.tag, data.index, 'colorIndex'),
    onHandleTagDelete: props => tag =>
      props.showDialog('tag-delete-confirm', { tag }),
    onHandleTagDescriptionUpdate: props => data =>
      props.updateTag(data.tag, data.description, 'description'),

    onHandleContactNicknameUpdate: props => data =>
      props.updateContact(data.contact, data.nickname, 'nickname'),
    onHandleContactDelete: props => contact =>
      props.showDialog('contact-delete-confirm', { contact }),
    onHandleContactDescriptionUpdate: props => data =>
      props.updateContact(data.contact, data.description, 'description'),
  }),
  withHandlers({
    onHandleKeyDown: props => event => {
      if (event.repeat) {
        return
      }

      switch (event.which) {
        // escape
        case 27:
          props.onHandleToggleList()
          return

        // backspace
        case 8:
          props.onHandleToggleList()
          return

        // arrow left key
        case 37:
          props.onHandlePrevious()
          return

        // arrow right key
        case 39:
          props.onHandleNext()
          return

        default:
          return
      }
    }
  }),
  withHandlers({
    onHandleClickOutSide: props => event => {
      const detail = findDOMNode(this.detail)

      if (!detail.contains(event.target)) {
        document.removeEventListener('keydown', props.onHandleKeyDown, false)
      }
    }
  }),
  withHandlers({
    onHandleAddEventListener: props => () => {
      document.getElementById('user-container').addEventListener('click', props.onHandleClickOutSide, false)
      document.addEventListener('keydown', props.onHandleKeyDown, false)
    },
    onHandleRemoveEventListener: props => event => {
      event.stopPropagation()
      document.removeEventListener('keydown', props.onHandleKeyDown, false)
    }
  }),
  lifecycle({
    componentDidMount() {
      document.getElementById('user-container').addEventListener('click', this.props.onHandleClickOutSide, false)
      document.addEventListener('keydown', this.props.onHandleKeyDown, false)
    },
    componentWillUnmount() {
      document.getElementById('user-container').removeEventListener('click', this.props.onHandleClickOutSide, false)
      document.removeEventListener('keydown', this.props.onHandleKeyDown, false)
    }
  })
)(Detail)
