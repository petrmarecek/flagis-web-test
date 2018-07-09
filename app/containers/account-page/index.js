import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'
import {
  deselectTasks,
  cancelTimeLine,
  fetchArchivedTasks,
} from '../../redux/store/tasks/tasks.actions'
import { changePassword, logout } from 'redux/store/auth/auth.actions'
import { deselectTags } from '../../redux/store/tags/tags.actions'
import { fetchContacts, deselectContacts } from '../../redux/store/contacts/contacts.actions'
import { setContent } from '../../redux/store/account/account.actions'
import { hideArchivedTasks } from '../../redux/store/app-state/app-state.actions'
import { getDetail } from '../../redux/store/app-state/app-state.selectors'
import { getAccountContent } from '../../redux/store/account/account.selectors'

import LeftPanel from 'components/panels/left-panel'
import AccountMenu from 'components/account-menu/'
import CenterPanel from 'components/panels/center-panel'
import ArchiveContent from 'components/contents/archive-content'
import ContactContent from 'components/contents/contact-content'
import ArchiveDetailContent from 'components/contents/archive-detail-content'
import DetailContent from 'components/contents/detail-content'
import ChangePassword from 'components/common/change-password'

const AccountPage = props => {

  const {
    content,
    detail,
    onHandleSetContent,
    onHandleArchivedTasks,
    onHandleContacts,
    onHandleLogOut
  } = props

  const getArchivedContent = () => {
    if (detail.archive) {
      return (
        <ArchiveDetailContent />
      )
    }

    onHandleArchivedTasks()
    return (
      <ArchiveContent />
    )
  }

  const getContactsContent = () => {
    if (detail.contact) {
      return (
        <DetailContent/>
      )
    }

    onHandleContacts()
    return (
      <ContactContent/>
    )
  }

  const getContent = () => {
    switch (content) {
      case 'archivedTasks':
        return getArchivedContent()

      case 'contactsList':
        return getContactsContent()

      case 'changePassword':
        return <ChangePassword/>

      default:
        return <div>Account content</div>
    }
  }

  const centerPanelStyle = (content === 'archivedTasks' || content === 'contactsList')
      ? {}
      : { margin: '10px 10px 0 10px', backgroundColor: '#fff' }

  return (
    <div>
      <LeftPanel>
        <AccountMenu
          content={content}
          onChange={onHandleSetContent}
          onLogOut={onHandleLogOut} />
      </LeftPanel>
      <CenterPanel style={centerPanelStyle}>
        {getContent()}
      </CenterPanel>
    </div>
  )
}

AccountPage.propTypes = {
  content: PropTypes.string,
  detail: PropTypes.object,
  onHandleSetContent: PropTypes.func,
  onHandleArchivedTasks: PropTypes.func,
  onHandleContacts: PropTypes.func,
  onHandleLogOut: PropTypes.func,
}

const mapStateToProps = state => ({
  content: getAccountContent(state),
  detail: getDetail(state),
})

const mapDispatchToProps = {
  setContent,
  deselectTasks,
  cancelTimeLine,
  deselectTags,
  deselectContacts,
  fetchArchivedTasks,
  hideArchivedTasks,
  fetchContacts,
  changePassword,
  logout,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onHandleSetContent: props => content => props.setContent(content),
    onHandleArchivedTasks: props => () => {
      props.deselectTasks()
      props.cancelTimeLine()
      props.deselectTags()
      props.deselectContacts()
      props.fetchArchivedTasks()
    },
    onHandleContacts: props => () => {
      props.hideArchivedTasks()
      props.deselectTasks()
      props.cancelTimeLine()
      props.deselectTags()
      props.fetchContacts()
    },
    onHandleLogOut: props => () => {
      props.logout()
    },
  })
)(AccountPage)
