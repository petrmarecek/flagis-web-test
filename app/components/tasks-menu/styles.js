import styled from 'styled-components'
import { boxSizing } from '../common/styled-component-mixins'

const TasksMenuItem = styled.div`
  ${boxSizing('border-box')}
  height: 100%;
  width: 40px;
  margin: 0 0 0 10px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export {
  TasksMenuItem
}
