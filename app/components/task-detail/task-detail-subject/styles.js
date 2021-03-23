import styled from 'styled-components'
import { transition, link } from 'components/styled-components-mixins'

const Input = styled.input.attrs(props => ({
  disable: !props.isUpdatable,
}))`
  width: 100%;
  height: 24px;

  background-color: transparent;
  border: 0;
  padding: 0 0 0 13px;

  font-size: 16px;
  font-weight: ${props => (props.isImportant ? 'bold' : 'normal')};
  text-decoration: ${props => (props.isCompleted ? 'line-through' : 'none')};
  line-height: 19px;
  color: ${props =>
    props.isCompleted && !props.isArchived ? '#CECECE' : '#293034'};

  pointer-events: ${props => (props.isUpdatable ? 'normal' : 'none')};
  ${transition('color 500ms ease-out')};
  ${link}
`

const Wrapper = styled.div`
  width: 100%;
`

export { Input, Wrapper }
