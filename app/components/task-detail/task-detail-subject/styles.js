import styled from 'styled-components'

const Input = styled.input.attrs(props => ({
  disable: !props.isUpdatable,
}))`
  width: 100%;
  height: 24px;

  background-color: transparent;
  border: 0;
  padding: 0 0 0 13px;

  font-size: 16px;
  font-weight: ${props => props.isImportant ? 'bold' : 'normal'};
  text-decoration: ${props => props.isCompleted ? 'line-through' : 'none'};
  line-height: 19px;
  color: #1C2124;

  pointer-events: ${props => props.isUpdatable ? 'normal' : 'none'};
`

const Wrapper = styled.div`
  width: 100%;
`

export {
  Input,
  Wrapper,
}
