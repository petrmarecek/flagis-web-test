import React, { Component } from 'react'
import PropTypes from 'prop-types'
import velocity from 'velocity-animate'
import { connect } from 'react-redux'

import { activeUndo } from 'redux/store/app-state/app-state.actions'
import { getAppStateItem } from 'redux/store/app-state/app-state.selectors'

import { ICONS } from 'components/icons/icon-constants'
import Icon from 'components/icons/icon'

import styled from 'styled-components'

const UndoContainer = styled.div`
  position: relative;
  float: right;
  margin-top: 10px;
  display: flex;
  height: 45px;
  color: #fff;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  pointer-events: auto;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: #1c2124;
  height: 100%;
  padding: 0 15px;
  border-radius: 5px 0 0 5px;
  -webkit-border-radius: 5px 0 0 5px;
  -moz-border-radius: 5px 0 0 5px;
`;

const Title = styled.div`
  margin-left: 10px;
  font-size: 14px;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  padding: 0 20px;
  background-color: #293034;
  font-size: 16px;
  font-weight: 600;
  border-radius: 0 5px 5px 0;
  -webkit-border-radius: 0 5px 5px 0;
  -moz-border-radius: 0 5px 5px 0;
  border-left: 1px solid #8c9da9;
  cursor: pointer;
`;

class UndoBox extends Component {

  static propTypes = {
    undoBox: PropTypes.object,
    activeUndo: PropTypes.func,
  }

  componentDidUpdate() {
    if (this.props.undoBox) {
      velocity(this.container, 'transition.slideRightIn', { duration: 400, display: 'flex' })
    }
  }

  handleUndo = () => {
    const { name } = this.props.undoBox
    if (name === 'tagDelete') {
      this.props.activeUndo('UNDO_TAGS/DELETE')
      return
    }

    if (name === 'treeItemDelete' || name === 'treeGroupDelete') {
      this.props.activeUndo('UNDO_TREE/DELETE')
      return
    }

    this.props.activeUndo('UNDO_TASK/DELETE')
  }

  // Get current undoBox
  getRenderUndoBox(undoBox) {
    if (!undoBox) {
      return null
    }

    const title = {
      taskDelete: 'Task deleted',
      tagDelete: 'Tag deleted',
      treeItemDelete: 'Tree item deleted',
      treeGroupDelete: 'Tree filter group deleted',
    }

    return (
      <UndoContainer innerRef={comp => {this.container = comp}}>
        <Info>
          <Icon
            icon={ICONS.ARROW_UNDO}
            width={22}
            height={20}
            color="#fff" />
          <Title >
            {title[undoBox.name]}
          </Title>
        </Info>
        <Button onClick={this.handleUndo}>
          Undo
        </Button>
      </UndoContainer>
    )
  }

  render() {
    const undoBox = this.getRenderUndoBox(this.props.undoBox)
    return (
      <div>
        { undoBox }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  undoBox: getAppStateItem(state, 'undoBox'),
})
const mapDispatchToProps = { activeUndo }
export default connect(mapStateToProps, mapDispatchToProps)(UndoBox)
