import React from 'react'
import PropTypes from 'prop-types'
import constants from 'utils/constants'
import { compose, withStateHandlers } from 'recompose'

// redux
import { connect } from 'react-redux'
import { createTag } from 'redux/store/tags/tags.actions'
import {
  isStringEmpty,
  getColorIndex,
} from '../../redux/utils/component-helper'

// components
import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

// styles
import styled from 'styled-components'
import {
  boxShadow,
  borderRadius,
  boxSizing,
  placeholderColor,
} from '../styled-components-mixins'

const AddForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  background-color: #fff;
  height: 38px;
  ${borderRadius('3px')}
  ${boxShadow('0 1px 6px 0 #CECECE')}
`

const SubmitIcon = styled.div`
  ${boxSizing('border-box')};
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 55px;
  height: 38px;
  margin: 0;
  cursor: pointer;
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
`

const SubjectContainer = styled.div`
  position: relative;
  padding: 0;
  height: auto;
  width: 100%;
`

const Subject = styled.input`
  ${placeholderColor('#CECECE')}
  ${boxSizing('border-box')}
  border: none;
  width: 100%;
  font-size: 16px;
  height: 36px;
  z-index: 5;
  padding-left: 24px;
  margin: 0;
  font-weight: ${props => (props.isImportant ? 'bold' : 'normal')};
  background-color: #fff;
`

const AddTagForm = ({ title, handleChange, handleSubmit }) => {
  const addButtonDisabled = isStringEmpty(title)
  const plusColor = addButtonDisabled ? '#CECECE' : '#44FFB1'

  return (
    <AddForm autoComplete="off" onSubmit={handleSubmit}>
      <SubjectContainer>
        <Subject
          type="text"
          name="title"
          placeholder="Add new tag"
          value={title}
          onChange={handleChange}
        />
      </SubjectContainer>
      <SubmitIcon onClick={handleSubmit} disabled={addButtonDisabled}>
        <Icon
          icon={ICONS.PLUS}
          width={16}
          height={16}
          scale={0.55}
          color={[plusColor]}
        />
      </SubmitIcon>
    </AddForm>
  )
}

AddTagForm.propTypes = {
  title: PropTypes.string,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
}

const mapStateToProps = () => ({})

const mapDispatchToProps = { createTag }

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStateHandlers(() => ({ title: '' }), {
    handleChange: () => event => {
      const title = event.target.value

      if (title.length > constants.TAGS_TITLE_MAX_CHARACTERS) {
        return {}
      }

      return { title }
    },
    handleSubmit: ({ title }, props) => event => {
      event.preventDefault()

      if (isStringEmpty(title)) {
        return {}
      }

      const colorIndex = getColorIndex(null, title)
      props.createTag({ title, colorIndex })
      return { title: '' }
    },
  })
)(AddTagForm)
