import React from 'react'
import PropTypes from 'prop-types'
import { withHandlers } from 'recompose'

import DetailMenu from './detail-menu'
import ContentEditable from '../common/content-editable'
import Icon from '../icons/icon'
import {ICONS} from '../icons/icon-constants'

import {
  DetailInner,
  DetailContentTop,
  DetailContentSubject,
  DetailSubject,
  DetailContentDeleteIcon,
  DetailContentCenter,
  DetailSubjectIconContact,
  DetailContentPropertiesContact,
  DetailContentDescriptionContact,
  MarkdownEditableContainer,
  DetailContentContactData,
  DetailContentContactDataLabel,
  DetailContentContactDataContent,
} from './styles'

const ContactDetail = props => {

  const {
    contact,
    onHandleRemoveEventListener,
    onHandleToggleList,
    onHandlePrevious,
    onHandleNext,
    onHandleNicknameUpdate,
    onHandleDelete,
    onHandleContactDescriptionUpdate,
  } = props

  if (!contact) {
    return <div>Detail not found</div>
  }

  const description = contact.description === null ? 'Add description' : contact.description
  const nickname = contact.nickname === '' ? 'Add username' : contact.nickname
  let icon = {
    icon: ICONS.CONTACT_EXIST,
    height: 23,
    width: 28,
    color: ['#8C9DA9', '#fff'],
  }

  if (!contact.isUser) {
    icon = {
      icon: ICONS.CONTACT_NOT_EXIST,
      height: 23,
      width: 28,
      color: ['#8C9DA9', '#fff', '#FF6A6A'],
    }
  }

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
              <DetailSubjectIconContact isUser={contact.isUser}>
                <Icon
                  icon={icon.icon}
                  width={icon.width}
                  height={icon.height}
                  color={icon.color} />
              </DetailSubjectIconContact>
              <span onClick={onHandleRemoveEventListener}>
                <ContentEditable
                  className='detail-subject__content'
                  html={nickname}
                  placeholder='Add username'
                  enforcePlainText
                  onChange={onHandleNicknameUpdate} />
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
              onClick={onHandleDelete} />
          </DetailContentDeleteIcon>
        </DetailContentTop>

        <DetailContentCenter>
          <DetailContentPropertiesContact>
            <DetailContentContactData>
              <DetailContentContactDataLabel>
                E-Mail
              </DetailContentContactDataLabel>
              <DetailContentContactDataContent>
                {contact.email}
              </DetailContentContactDataContent>
            </DetailContentContactData>
            {!contact.isUser &&
            <DetailContentContactData>
              <DetailContentContactDataLabel>
                Non-existing user
              </DetailContentContactDataLabel>
            </DetailContentContactData>}
          </DetailContentPropertiesContact>

          <DetailContentDescriptionContact>
            <span onClick={onHandleRemoveEventListener}>
              <MarkdownEditableContainer
                text={description}
                onUpdate={onHandleContactDescriptionUpdate} />
            </span>
          </DetailContentDescriptionContact>
        </DetailContentCenter>
      </DetailInner>
    </div>
  )
}

ContactDetail.propTypes = {
  contact: PropTypes.object,
  onHandleNicknameUpdate: PropTypes.func,
  onHandleContactNicknameUpdate: PropTypes.func,
  onHandleDelete: PropTypes.func,
  onHandleContactDelete: PropTypes.func,
  onHandleContactDescriptionUpdate: PropTypes.func,
  onHandleDescriptionUpdate: PropTypes.func,
  onHandleRemoveEventListener: PropTypes.func,
  onHandleToggleList: PropTypes.func,
  onHandleNext: PropTypes.func,
  onHandlePrevious: PropTypes.func,
}

export default withHandlers({
  onHandleNicknameUpdate: props => event => {
    const nickname = event.target.value
    if (nickname === props.contact.nickname || nickname === 'Add username' || nickname === '') {
      return
    }

    const data = { contact: props.contact, nickname }
    props.onHandleContactNicknameUpdate(data)
  },
  onHandleDelete: props => () => props.onHandleContactDelete(props.contact),
  onHandleContactDescriptionUpdate: props => event => {
    const description = event.target.value
    if (description === props.contact.description || description === 'Add description' || description === '') {
      return
    }

    const data = { item: props.contact, description }
    props.onHandleDescriptionUpdate(data)
  },
})(ContactDetail)
