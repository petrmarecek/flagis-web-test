import React from 'react'
import PropTypes from 'prop-types'
import { withHandlers } from 'recompose'

import DetailMenu from './detail-menu'
import ContentEditable from '../common/content-editable'
import MarkdownEditable from '../common/markdown-editable'
import Icon from '../icons/icon'
import {ICONS} from '../icons/icon-constants'

import {
  DetailInner,
  DetailContentTop,
  DetailContentSubject,
  DetailSubject,
  DetailSubjectIcon,
  DetailContentCenter,
  DetailContentPropertiesContact,
  DetailContentDescriptionContact,
  DetailContentContactData,
  DetailContentContactDataLabel,
  DetailContentContactDataContent,
} from './styles'

const ContactDetail = props => {

  const {
    contact,
    onHandleRemoveEventListener,
    onHandleToggleContactList,
    onHandlePreviousContact,
    onHandleNextContact,
    onHandleDescriptionUpdate,
    onHandleNicknameUpdate,
  } = props

  if (!contact) {
    return <div>Detail not found</div>
  }

  const isUser = contact.nickname !== 'null null'
  const description = contact.description === null ? 'Add description' : contact.description
  const nickname = contact.nickname === 'null null' ? 'Add username' : contact.nickname

  let icon = {
    icon: ICONS.CONTACT_EXIST,
    height: 23,
    width: 28,
    color: ['#8C9DA9', '#fff'],
  }

  if (!isUser) {
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
        back={onHandleToggleContactList}
        previous={onHandlePreviousContact}
        next={onHandleNextContact} />
      <DetailInner>
        <DetailContentTop>
          <DetailContentSubject>
            <DetailSubject>
              <DetailSubjectIcon isUser={isUser}>
                <Icon
                  icon={icon.icon}
                  width={icon.width}
                  height={icon.height}
                  color={icon.color} />
              </DetailSubjectIcon>
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
            {!isUser &&
            <DetailContentContactData>
              <DetailContentContactDataLabel>
                Non-existing user
              </DetailContentContactDataLabel>
            </DetailContentContactData>}
          </DetailContentPropertiesContact>

          <DetailContentDescriptionContact>
            <span onClick={onHandleRemoveEventListener}>
              <MarkdownEditable
                text={description}
                onUpdate={onHandleDescriptionUpdate} />
            </span>
          </DetailContentDescriptionContact>
        </DetailContentCenter>
      </DetailInner>
    </div>
  )
}

ContactDetail.propTypes = {
  contact: PropTypes.object,
  onHandleRemoveEventListener: PropTypes.func,
  onHandleToggleContactList: PropTypes.func,
  onHandleNextContact: PropTypes.func,
  onHandlePreviousContact: PropTypes.func,
  onHandleDescriptionUpdate: PropTypes.func,
  onHandleContactDescriptionUpdate: PropTypes.func,
  onHandleNicknameUpdate: PropTypes.func,
  onHandleContactNicknameUpdate: PropTypes.func,
}

export default withHandlers({
  onHandleDescriptionUpdate: props => event => {
    const description = event.target.value
    if (description === props.contact.description || description === 'Add description') {
      return
    }

    const data = { contact: props.contact, description }
    props.onHandleContactDescriptionUpdate(data)
  },
  onHandleNicknameUpdate: props => event => {
    const nickname = event.target.value
    if (nickname === props.contact.nickname || nickname === 'Add username') {
      return
    }

    const data = { contact: props.contact, nickname }
    props.onHandleContactNicknameUpdate(data)
  },
})(ContactDetail)
