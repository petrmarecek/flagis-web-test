import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState, withHandlers, pure } from 'recompose'

const AddTagTreeSectionForm = ({
  getInputRef,
  onHandleBlur,
  onHandleKeyDown,
}) => (
  <input
    ref={ref => getInputRef(ref)}
    placeholder="Add section"
    type="text"
    onKeyDown={onHandleKeyDown}
    onBlur={onHandleBlur}
  />
)

AddTagTreeSectionForm.propTypes = {
  inputRef: PropTypes.object,
  onCancel: PropTypes.func,
  onSubmiting: PropTypes.func,
  onSubmit: PropTypes.func,
  onAddInputRef: PropTypes.func,
  getInputRef: PropTypes.func,
  setInputRef: PropTypes.func,
  onHandleSubmit: PropTypes.func,
  onHandleBlur: PropTypes.func,
  onHandleKeyDown: PropTypes.func,
}

export default compose(
  withState('inputRef', 'setInputRef', null),
  withHandlers({
    getInputRef: props => ref => {
      props.onAddInputRef(ref)
      props.setInputRef(ref)
    },
    onHandleSubmit: props => () => {
      // raise submitting event
      const title = props.inputRef.value
      const eventArgs = { canceled: false, title }
      props.onSubmiting(eventArgs)

      // if the event was stopped
      if (eventArgs.canceled) {
        return false
      }

      // raise submit event
      props.onSubmit({ id: -1, title })
      return true
    },
    onHandleBlur: props => () => {
      if (props.onCancel) {
        props.onCancel()
      }
    },
  }),
  withHandlers({
    onHandleKeyDown: props => event => {
      switch (event.which) {
        // escape
        case 27:
          props.onHandleBlur()
          return

        // sumit (enter key)
        case 13:
          event.preventDefault()
          props.onHandleSubmit()
          return
        default:
          return
      }
    },
  }),
  pure
)(AddTagTreeSectionForm)
