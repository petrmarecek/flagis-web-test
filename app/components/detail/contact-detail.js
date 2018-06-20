import React from 'react'
import PropTypes from 'prop-types'
import { compose, withStateHandlers, lifecycle } from 'recompose'

import DetailMenu from './detail-menu'
import ContentEditable from '../common/content-editable'
import Icon from '../icons/icon'
import {ICONS} from '../icons/icon-constants'

const ContactDetail = props => {

  const {
    contact,
    nickname,
    description,
    onHandleToggleContactList,
    onHandlePreviousContact,
    onHandleNextContact,
    onHandleDescriptionChange,
    onHandleDescriptionUpdate,
    onHandleNicknameUpdate,
  } = props

  const isUser = contact.nickname !== 'null null'
  let icon = {
    icon: ICONS.CONTACT_EXIST,
    height: 21,
    width: 21,
    scale: 1,
    color: ['#8C9DA9', '#fff'],
  }

  if (!isUser) {
    icon = {
      icon: ICONS.CONTACT_NOT_EXIST,
      height: 21,
      width: 25,
      scale: 0.92,
      color: ['#8C9DA9', '#fff', '#FF6A6A'],
    }
  }

  return (
    <div
      className="detail">
      <DetailMenu
        back={onHandleToggleContactList}
        previous={onHandlePreviousContact}
        next={onHandleNextContact} />
      <div className="detail-inner">
        <div className="detail-content detail-content__top">
          <div className="detail-content__subject">
            <div className="detail-subject">
              <Icon
                className="detail-subject__completed"
                icon={icon.icon}
                width={icon.width}
                height={icon.height}
                scale={icon.scale}
                color={icon.color}/>
              <span>
                <ContentEditable
                  className="detail-subject__content"
                  html={nickname}
                  placeholder='Add username'
                  enforcePlainText
                  onChange={onHandleNicknameUpdate} />
              </span>
            </div>
          </div>
        </div>

        <div className="detail-content detail-content__center">
          <div className="detail-content__properties">
            <div className="detail-content__date">
              <span className="detail-content__date-label">
                Start date
              </span>
              <input className="detail-content__date-picker"/>
            </div>
          </div>

          <div className="detail-content__description">
            <textarea
              value={description}
              placeholder="Add a Description"
              onChange={onHandleDescriptionChange}
              onBlur={onHandleDescriptionUpdate} />
          </div>
        </div>
      </div>
    </div>
  )
}

ContactDetail.propTypes = {
  contact: PropTypes.object,
  nickname: PropTypes.string,
  description: PropTypes.string,
  onHandleToggleContactList: PropTypes.func,
  onHandleNextContact: PropTypes.func,
  onHandlePreviousContact: PropTypes.func,
  onHandleDescriptionChange: PropTypes.func,
  onHandleDescriptionUpdate: PropTypes.func,
  onHandleContactDescriptionUpdate: PropTypes.func,
  onHandleNicknameUpdate: PropTypes.func,
  onHandleContactNicknameUpdate: PropTypes.func,
}

export default compose(
  withStateHandlers(
    ({ contact }) => ({
      nickname: contact.nickname === 'null null' ? 'Add username' : contact.nickname,
      description: contact.description === null ? '' : contact.description
    }),
    {
      onHandleDescriptionChange: () => event => ({ description: event.target.value }),
      onHandleDescriptionUpdate: ({ description }, props) => () => {
        const data = {contact: props.contact, description}
        props.onHandleContactDescriptionUpdate(data)
      },
      onHandleNicknameUpdate: (state, props) => event => {
        const nickname = event.target.value
        const data = { contact: props.contact, nickname }

        props.onHandleContactNicknameUpdate(data)
      }
    }
  ),
  lifecycle({
    componentWillReceiveProps(newProps) {
      const prevId = this.props.contact.id
      const prevNickname = this.props.contact.nickname
      const prevDescription = this.props.contact.description
      const { id, nickname, description } = newProps.contact

      if (prevId !== id) {
        this.setState({
          nickname: nickname === 'null null' ? 'Add username' : nickname,
          description: description === null ? '' : description
        })
      }

      if (prevNickname !== nickname) {
        this.setState({ nickname: nickname === 'null null' ? 'Add username' : nickname })
      }

      if (prevDescription !== description) {
        this.setState({ description: description === null ? '' : description })
      }
    }
  })
)(ContactDetail)
