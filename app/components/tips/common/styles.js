import styled from 'styled-components'

// TODO: Change color literals to constants

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  width: 100%;
  height: 100%;

  background-color: rgba(28, 33, 36, 0.5);
  z-index: 9999;
`

export {
  Wrapper,
}
