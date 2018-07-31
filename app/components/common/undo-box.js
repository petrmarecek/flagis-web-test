import React from 'react'
import PropTypes from 'prop-types'
import velocity from 'velocity-animate'
import { connect } from 'react-redux'
import { compose, withHandlers, lifecycle } from 'recompose'

import { activeUndo } from 'redux/store/app-state/app-state.actions'
import { getAppStateItem } from 'redux/store/app-state/app-state.selectors'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

import { borderRadius } from '../styled-components-mixins'
import styled from 'styled-components'

const UndoContainer = styled.div`
  ${borderRadius('5px')}
  z-index: 10000;
  position: fixed;
  bottom: 50px;
  right: 30px;
  display: flex;
  height: 45px;
  color: #fff;
  cursor: pointer;
`;

const Info = styled.div`
  ${borderRadius('5px 0 0 5px')}
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: #1c2124;
  height: 100%;
  padding: 0 15px;
`;

const Title = styled.div`
  margin-left: 10px;
  font-size: 14px;
`;

const Button = styled.div`
  ${borderRadius('0 5px 5px 0')}
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  padding: 0 20px;
  background-color: #293034;
  font-size: 16px;
  font-weight: 600;
  border-left: 1px solid #8c9da9;
`;

const UndoBox = ({ undoBox, onHandleUndo }) => {
  if (!undoBox) {
    return null
  }

  const title = {
    taskDelete: 'Task deleted',
    tagDelete: 'Tag deleted',
    treeItemDelete: 'Tree item deleted',
    treeGroupDelete: 'Tree filter group deleted',
    contactDelete: 'Contact deleted',
  }

  return (
    <UndoContainer
      id='undoBox'
      onClick={onHandleUndo} >
      <Info>
        <Icon
          icon={ICONS.ARROW_UNDO}
          width={22}
          height={20}
          color={["#fff"]} />
        <Title >
          {title[undoBox.name]}
        </Title>
      </Info>
      <Button>
        Undo
      </Button>
    </UndoContainer>
  )
}

UndoBox.propTypes = {
  undoBox: PropTypes.object,
  onHandleUndo: PropTypes.func,
}

const mapStateToProps = state => ({
  undoBox: getAppStateItem(state, 'undoBox'),
})

const mapDispatchToProps = { activeUndo }

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onHandleUndo: props => () => {
      switch (props.undoBox.name) {
        case 'tagDelete':
          props.activeUndo('UNDO_TAGS/DELETE')
          break

        case 'treeItemDelete':
          props.activeUndo('UNDO_TREE/DELETE')
          break

        case 'treeGroupDelete':
          props.activeUndo('UNDO_TREE/DELETE')
          break

        case 'contactDelete':
          props.activeUndo('UNDO_CONTACTS/DELETE')
          break

        default:
          props.activeUndo('UNDO_TASK/DELETE')
      }
    }
  }),
  lifecycle({
    componentDidUpdate() {
      if (this.props.undoBox) {
        const elem = document.getElementById('undoBox')
        velocity(elem, 'transition.slideRightIn', { duration: 400, display: 'flex' })
      }
    }
  })
)(UndoBox)
