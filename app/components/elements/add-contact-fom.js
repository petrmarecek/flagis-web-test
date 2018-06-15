import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, withStateHandlers } from 'recompose'

import { createContact } from 'redux/store/contacts/contacts.actions'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

import styled from 'styled-components'

const AddFormContainer = styled.form`
  margin-bottom: 6px;
  background-color: white;
  -webkit-box-shadow: 0 3px 4px 0 #d5dce0;
  -moz-box-shadow: 0 3px 4px 0 #d5dce0;
  box-shadow:0 3px 4px 0 #d5dce0;
`;

const Submit = styled.div`
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  float: right;
  margin: 0;
  height: 50px;
  padding: 11px 16px 10px 16px;
  width: 61px;
  cursor: pointer;
`;

const SubjectContainer = styled.div`
  margin-right: 61px;
  padding: 0;
`;

const Subject = styled.input`
  &::-webkit-input-placeholder {
        color: #d7e3ec;
  }
  &:-moz-placeholder { /!* Firefox 18- *!/
      color: #d7e3ec;
  }

  &::-moz-placeholder { /!* Firefox 19+ *!/
      color: #d7e3ec;
  }

  &:-ms-input-placeholder {
      color: #d7e3ec;
  }
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  border: none;
  font-size: 16px;
  height: 50px;
  padding: 5px 0 5px 10px;
`;

const AddContactForm = props => {

  const {
    ondHandleFocus,
    ondHandleBlur,
    onHandleSubmit,
    onHandleSubjectChanged,
    subject
  } = props

  const addButtonDisabled = !subject.trim()
  const plusColor = addButtonDisabled
    ? '#d7e3ec'
    : '#44FFB1'

  return (
    <AddFormContainer
      autoComplete="off"
      onSubmit={onHandleSubmit}>
      <Submit
        onClick={onHandleSubmit}
        disabled={addButtonDisabled}>
        <Icon
          icon={ICONS.PLUS}
          width={29}
          height={29}
          color={plusColor}/>
      </Submit>
      <SubjectContainer>
        <Subject
          type="text"
          name="subject"
          placeholder="Add new contact"
          value={subject}
          onChange={onHandleSubjectChanged}
          onFocus={ondHandleFocus}
          onBlur={ondHandleBlur} />
      </SubjectContainer>
    </AddFormContainer>
  )
}

AddContactForm.propTypes = {
  ondHandleFocus: PropTypes.func,
  ondHandleBlur: PropTypes.func,
  onHandleSubmit: PropTypes.func,
  onHandleSubjectChanged: PropTypes.func,
  subject: PropTypes.string,
}

const mapStateToProps = () => ({})
const mapDispatchToProps = { createContact }

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStateHandlers(
    () => ({
      subject: '',
      focused: false,
    }),
    {
      ondHandleFocus: () => () => ({ focused: true }),
      ondHandleBlur: () => () => ({ focused: false }),
      onHandleSubjectChanged: () => event => ({ subject: event.target.value }),
      onHandleSubmit: ({ subject }, props) => event => {
        event.preventDefault()

        if (subject.trim().length === 0) {
          return
        }

        // dispatch action
        //props.createTag(subject)

        // reset form
        return { subject: '' }
      }
  })
)(AddContactForm)
