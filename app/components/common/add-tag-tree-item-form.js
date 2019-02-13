import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, pure, withState, withHandlers, lifecycle } from 'recompose'
import { getTagsOfTree } from '../../redux/store/tree/tree.selectors'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'
import Autocomplete from 'components/autocomplete'

import styled from 'styled-components'
import { fontMain } from '../styled-components-mixins'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0 0;
  padding: 0 7px;
  position: relative;
  color: #fff;
  height: 26px;
  ${fontMain};
`

const ItemInput = styled.div`
  margin-left: 2px;

  input {
    ${fontMain};
    font-size: 14px;
    color: #a2a2a2;
    border: none !important;
    padding: 0;
  }
`

const AddTagTreeItemForm = props => {
  const { parentId, selectedItems, onHandleAddInputRef, onHandleOnBlur } = props

  return (
    <Wrapper>
      <Icon icon={ICONS.TAG} width={20} height={11} color={['#A2A2A2']} />
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
    </Wrapper>
  )
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
