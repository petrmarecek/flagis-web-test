import React from 'react'
import PropTypes from 'prop-types'
import { withHandlers } from 'recompose'
import constants from 'utils/constants'

// components
import TextEditor from 'components/editor'
import Avatar from 'react-avatar'
import DetailMenu from './detail-menu'
import Icon from '../icons/icon'
import { ICONS } from '../icons/icon-constants'

// styles
import {
  DetailInner,
  DetailContentTop,
  DetailContentSubject,
  DetailSubject,
  DetailContentIcon,
  DetailContentCenter,
  DetailContentProperties,
  DetailSubjectIconContact,
  ContentEditableWrapper,
  DetailSubjectContactContentEditable,
  DetailContentDescriptionContact,
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
    onHandleDescriptionUpdate,
    onHandleSendInvitation,
  } = props

  if (!contact) {
    return <div>Detail not found</div>
  }

  const nickname = contact.nickname === null ? '' : contact.nickname
  const description = contact.description === null ? '' : contact.description
  const editorHeight = 'calc(100vh - 132px)'
  const scrollStyle = {
    height: 'calc(100vh - 192px)',
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
              <DetailSubjectIconContact isUser={contact.isUser}>
                {contact.isUser ? (
                  <Avatar
                    src={contact.photo}
                    name={nickname}
                    size={21}
                    textSizeRatio={2}
                    round
                  />
                ) : (
                  <Icon
                    icon={ICONS.CONTACT_NO_EXIST}
                    width={28}
                    height={23}
                    color={['#b1b5b8', '#fff', '#FF6A6A']}
                  />
                )}
              </DetailSubjectIconContact>
              <ContentEditableWrapper onClick={onHandleRemoveEventListener}>
                <DetailSubjectContactContentEditable
                  html={nickname}
                  maxCharacters={constants.CONTACTS_TITLE_MAX_CHARACTERS}
                  placeholder="Add username"
                  enforcePlainText
                  onChange={onHandleNicknameUpdate}
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

        <DetailContentCenter allowed>
          <DetailContentProperties>
            <DetailContentContactData>
              <DetailContentContactDataLabel>
                E-Mail
              </DetailContentContactDataLabel>
              <DetailContentContactDataContent>
                {contact.email}
              </DetailContentContactDataContent>
            </DetailContentContactData>
            {!contact.isUser && (
              <DetailContentContactData>
                <DetailContentContactDataLabel>
                  Non-existing user
                </DetailContentContactDataLabel>
                {!contact.isInvited && (
                  <DetailContentContactDataContent
                    onClick={onHandleSendInvitation}
                    button
                  >
                    <Icon
                      icon={ICONS.SEND_INVITE}
                      width={17}
                      height={16}
                      color={['#b1b5b8']}
                    />
                    <span>Invite</span>
                  </DetailContentContactDataContent>
                )}
              </DetailContentContactData>
            )}
          </DetailContentProperties>

          <DetailContentDescriptionContact>
            <span onClick={onHandleRemoveEventListener}>
              <TextEditor
                componentId={contact.id}
                content={description}
                setDescription={onHandleDescriptionUpdate}
                editorHeight={editorHeight}
                scrollStyle={scrollStyle}
              />
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
  onHandleDescriptionUpdate: props => value => {
    const description = value
    if (description === props.contact.description) {
      return
    }

    const data = { contact: props.contact, description }
    props.onHandleContactDescriptionUpdate(data)
  },
  onHandleSendInvitation: props => () =>
    props.onHandleContactSendInvitation(props.contact),
})(ContactDetail)
