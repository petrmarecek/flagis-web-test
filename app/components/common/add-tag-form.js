import React from 'react'
import PropTypes from 'prop-types'
import { compose, withStateHandlers } from 'recompose'
import { connect } from 'react-redux'

import { createTag } from 'redux/store/tags/tags.actions'
import { isStringEmpty } from '../../redux/utils/component-helper'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

import styled from 'styled-components'
import { boxShadow, boxSizing, placeholderColor } from "../styled-components-mixins";

const AddForm = styled.form`
  margin-bottom: 6px;
  background-color: white;
  ${boxShadow('0 3px 4px 0 #d5dce0')}
`;

const SubmitIcon = styled.div`
  ${boxSizing('border-box')}
  display: inline-block;
  float: right;
  margin: 0;
  height: 30px;
  padding: 7px 20px;
  width: 56px;
  cursor: pointer;
`;

const SubjectContainer = styled.div`
  margin-right: 56px;
  padding: 0;
`;

const Subject = styled.input`
  ${placeholderColor('#d7e3ec')}
  ${boxSizing('border-box')}
  width: 100%;
  border: none;
  font-size: 16px;
  height: 30px;
  padding: 5px 0 5px 10px;
`;

const AddTagForm = ({ title, handleChange, handleSubmit }) => {
  const addButtonDisabled = isStringEmpty(title)
  const plusColor = addButtonDisabled
    ? '#d7e3ec'
    : '#44FFB1'

  return (
    <AddForm
      autoComplete="off"
      onSubmit={handleSubmit}>
      <SubmitIcon
        onClick={handleSubmit}
        disabled={addButtonDisabled}>
        <Icon
          icon={ICONS.PLUS}
          width={16}
          height={16}
          scale={0.55}
          color={[plusColor]}/>
      </SubmitIcon>
      <SubjectContainer>
        <Subject
          type="text"
          name="title"
          placeholder="Add new tag"
          value={title}
          onChange={handleChange} />
      </SubjectContainer>
    </AddForm>
  )
}

AddTagForm.propTypes = {
  title: PropTypes.string,
  createTag: PropTypes.func.isRequired,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
}

const mapStateToProps = () => ({})
const mapDispatchToProps = { createTag }
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStateHandlers(
    () => ({ title: '' }),
    {
      handleChange: () => event => ({ title: event.target.value }),
      handleSubmit: ({ title }, props) => event => {
        event.preventDefault()

        if (isStringEmpty(title)) {
          return {}
        }

        props.createTag({ title })
        return { title: '' }
      },
  })
)(AddTagForm)
