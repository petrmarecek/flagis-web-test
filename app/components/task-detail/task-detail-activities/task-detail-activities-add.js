import PropTypes from 'prop-types'
import React, { useCallback, useMemo } from 'react'
import { connect } from 'react-redux'

import { getUserId } from 'redux/store/auth/auth.selectors'
import { getContactById } from 'redux/store/contacts/contacts.selectors'

import { AddComment, AddCommentAvatar, AddCommentInput } from './styles'

const TaskDetailActivitiesAdd = ({ onSubmit, owner }) => {
  // Prepare handler for key press
  const handleKeyPress = useCallback(
    event => {
      // Check enter press
      const isSubmit = event.which === 13 || event.type === 'click'
      if (!isSubmit) {
        return
      }

      event.preventDefault()

      // Does not add comment when there is no content
      if (event.target.value === '') {
        return
      }

      // Save comment and reset field
      onSubmit(event.target.value)
      event.target.value = ''
    },
    [onSubmit]
  )

  return (
    <AddComment>
      <AddCommentAvatar src={owner.photo} name={owner.nickname} />
      <AddCommentInput onKeyPress={handleKeyPress} />
    </AddComment>
  )
}

TaskDetailActivitiesAdd.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  owner: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  const userId = getUserId(state)

  return {
    owner: getContactById(state, userId),
  }
}

export default connect(mapStateToProps)(TaskDetailActivitiesAdd)
