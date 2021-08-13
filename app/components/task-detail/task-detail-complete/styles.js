import styled from 'styled-components'

import CommonButton from '../../common/button'
import CheckIcon from '../../icons/check-icon'

const Button = styled(CommonButton)`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  background-color: ${props => (props.isCompleted ? '#00CD78' : '#FFFFFF')};
  border: 1px solid ${props => (props.isCompleted ? '#00CD78' : '#E4E4E4')};
  border-radius: 3.5px;
  box-sizing: border-box;
  filter: drop-shadow(0px 1px 3px rgba(216, 216, 216, 0.5));

  &:hover {
    border-color: #00cd78;
  }
`

const Icon = styled(CheckIcon)`
  g {
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
    opacity: ${props => (props.isCompleted ? 1 : 0.3)};

    path {
      fill: ${props => (props.isCompleted ? '#FFFFFF' : '#B1B5B8')};
    }

    ${Button}:hover & {
      box-shadow: none;
      opacity: 1;

      path {
        fill: ${props => (props.isCompleted ? '#FFFFFF' : '#00CD78')};
      }
    }
  }
`

export { Button, Icon }
