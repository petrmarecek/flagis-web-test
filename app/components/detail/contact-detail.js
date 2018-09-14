import React from 'react'
import PropTypes from 'prop-types'
import { withHandlers } from 'recompose'

import DetailMenu from './detail-menu'
import Icon from '../icons/icon'
import {ICONS} from '../icons/icon-constants'

import {
  DetailInner,
  DetailContentTop,
  DetailContentSubject,
  DetailSubject,
  DetailContentDeleteIcon,
  DetailContentCenter,
  DetailContentProperties,
  DetailSubjectIconContact,
  DetailSubjectContactContentEditable,
  DetailContentDescriptionContact,
  MarkdownEditableContainer,
  DetailContentContactData,
  DetailContentContactDataLabel,
  DetailContentContactDataContent,
  DetailContentContactButton,
  DetailContentContactButtonLabel,
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
    onHandleDescriptionUpdate,
    onHandleSendInvitation,
  } = props

  if (!contact) {
    return <div>Detail not found</div>
  }

  const nickname = contact.nickname === null ? '' : contact.nickname
  const description = contact.description === null ? '' : contact.description
  const scrollStyle = {
    height: 'calc(100vh - 232px)',
    overflow: 'hidden',
  }

  let icon = {
    icon: ICONS.CONTACT_EXIST,
    height: 23,
    width: 28,
    color: ['#8C9DA9', '#fff'],
  }

  if (!contact.isUser) {
    icon = {
      icon: ICONS.CONTACT_NO_EXIST,
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
                <DetailSubjectContactContentEditable
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
          <DetailContentProperties>
            <DetailContentContactData>
              <DetailContentContactDataLabel>E-Mail</DetailContentContactDataLabel>
              <DetailContentContactDataContent>{contact.email}</DetailContentContactDataContent>
            </DetailContentContactData>
            {!contact.isUser &&
            <DetailContentContactData>
              <DetailContentContactDataLabel>Non-existing user</DetailContentContactDataLabel>
              {!contact.isInvitation &&
              <DetailContentContactDataContent onClick={onHandleSendInvitation} button>
                <Icon
                  icon={ICONS.SEND_INVITE}
                  width={17}
                  height={16}
                  color={['#8C9DA9']} />
                <span>Invite</span>
              </DetailContentContactDataContent>}
            </DetailContentContactData>}
            <DetailContentContactButton>
              <DetailContentContactButtonLabel>Create task</DetailContentContactButtonLabel>
            </DetailContentContactButton>
          </DetailContentProperties>

          <DetailContentDescriptionContact>
            <span onClick={onHandleRemoveEventListener}>
              <MarkdownEditableContainer
                text={description}
                scrollStyle={scrollStyle}
                placeholder='Add description'
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
  onHandleNicknameUpdate: PropTypes.func,
  onHandleContactNicknameUpdate: PropTypes.func,
  onHandleDelete: PropTypes.func,
  onHandleContactDelete: PropTypes.func,
  onHandleDescriptionUpdate: PropTypes.func,
  onHandleContactDescriptionUpdate: PropTypes.func,
  onHandleSendInvitation: PropTypes.func,
  onHandleContactSendInvitation: PropTypes.func,
  onHandleRemoveEventListener: PropTypes.func,
  onHandleToggleList: PropTypes.func,
  onHandleNext: PropTypes.func,
  onHandlePrevious: PropTypes.func,
}

export default withHandlers({
  onHandleNicknameUpdate: props => event => {
    const nickname = event.target.value
    if (nickname === props.contact.nickname) {
      return
    }

    const data = { contact: props.contact, nickname }
    props.onHandleContactNicknameUpdate(data)
  },
  onHandleDelete: props => () => props.onHandleContactDelete(props.contact),
  onHandleDescriptionUpdate: props => event => {
    const description = event.target.value
    if (description === props.contact.description) {
      return
    }

    const data = { contact: props.contact, description }
    props.onHandleContactDescriptionUpdate(data)
  },
  onHandleSendInvitation: props => () => props.onHandleContactSendInvitation(props.contact),
})(ContactDetail)
