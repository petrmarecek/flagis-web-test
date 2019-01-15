import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, pure, withState, withHandlers, lifecycle } from 'recompose'
import { getTagsOfTree } from '../../redux/store/tree/tree.selectors'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'
import Autocomplete from 'components/autocomplete'
import AddTagTreeSectionForm from 'components/common/add-tag-tree-section-form'

import styled, { css } from 'styled-components'
import { fontMain } from '../styled-components-mixins'

const tagTreeInput = css`
  input {
    ${fontMain};
    color: #91a19a;
    padding: 3px;
  }
`

const Wrapper = styled.div`
  ${fontMain}
  ${tagTreeInput}
`

const AddItem = styled.div`
  font-size: 12px;
  cursor: pointer;
  margin: 0 0;
  padding: 0 5px;
  display: block;
  position: relative;
  color: #fff;
  line-height: 26px;
  height: 26px;
`

const AddSection = styled.div`
  background-color: #293034;
  border-bottom: 1px solid #44ffb1 !important;
`

const TagIcon = styled.span`
  display: block;
  position: absolute;
  left: 7px;
  top: 2px;
`

const ItemInput = styled.div`
  margin: -2px 0 0 26px;
  input {
    font-size: 16px;
    border: none !important;
  }
`

const SectionInput = styled.div`
  input {
    background-color: #293034;
    font-size: 20px;
    color: #fff !important;
    border: none !important;
  }
`

const isEmpty = title => {
  return title === null || title.trim() === ''
}

const AddTagTreeItemForm = props => {
  const {
    parentId,
    selectedItems,
    onHandleAddInputRef,
    onHandleOnBlur,
    onHandleSubmit,
    onHandleSubmitting,
  } = props

  const isSection = parentId === null
  const renderSectionAddForm = (
    <Wrapper>
      <AddSection>
        <SectionInput>
          <AddTagTreeSectionForm
            placeholder="Add new section"
            onAddInputRef={onHandleAddInputRef}
            onCancel={onHandleOnBlur}
            onSubmiting={onHandleSubmitting}
            onSubmit={onHandleSubmit}
          />
        </SectionInput>
      </AddSection>
    </Wrapper>
  )
  const renderItemAddForm = (
    <Wrapper>
      <AddItem>
        <TagIcon>
          <Icon icon={ICONS.TAG} width={20} height={11} color={['#91a19a']} />
        </TagIcon>
        <ItemInput>
          <Autocomplete
            dataType="tags"
            location="tagTree"
            placeholder="Add filter"
            selectedItems={selectedItems}
            parentId={parentId}
            onAddInputRef={onHandleAddInputRef}
            onBlurTagTree={onHandleOnBlur}
            isWithoutItems
            isFocusTagTree
          />
        </ItemInput>
      </AddItem>
    </Wrapper>
  )

  return isSection ? renderSectionAddForm : renderItemAddForm
}

AddTagTreeItemForm.propTypes = {
  parentId: PropTypes.string,
  selectedItems: PropTypes.object,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  inputRef: PropTypes.object,
  setInputRef: PropTypes.func,
  onHandleAddInputRef: PropTypes.func,
  onHandleOnBlur: PropTypes.func,
  onHandleSubmit: PropTypes.func,
  onHandleSubmitting: PropTypes.func,
}

const mapStateToProps = (state, props) => ({
  selectedItems: getTagsOfTree(state, props.parentId)(state),
})

export default compose(
  pure,
  connect(mapStateToProps),
  withState('inputRef', 'setInputRef', null),
  withHandlers({
    onHandleAddInputRef: props => ref => props.setInputRef(ref),
    onHandleOnBlur: props => () => props.onCancel(),
    onHandleSubmit: props => tag => {
      // Get result of the add form
      const result = {
        title: tag.title,
        parentId: props.parentId,
        order: Date.now(),
      }

      // Validate
      if (isEmpty(tag.title)) {
        props.onCancel()
        return
      }

      // Propagate
      props.onSubmit(result)
    },
    onHandleSubmitting: () => event => {
      // Validate not empty
      if (isEmpty(event.title)) {
        event.canceled = true
        return
      }

      // TODO: Validate name conflict
    },
  }),
  lifecycle({
    componentDidMount() {
      window.setTimeout(() => {
        if (this.props.inputRef) {
          this.props.inputRef.focus()
        }
      }, 10)
    },
  })
)(AddTagTreeItemForm)
