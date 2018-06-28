import styled, { css } from 'styled-components'
import { boxSizing } from './styled-component-mixins'

// ------ Local styles ----------------------------------------------------
const styles = css`
  ${boxSizing}
  font-family: 'Source Sans Pro', 'Segoe UI', sans-serif;
  font-weight: 300;
  width: 100%;
  padding: 15px;
  background-color: #fff;
  border: 1px solid #D7E3EC;
  font-size: 14px;
  color: '#293034';
  min-height: 190px;
  max-height: 100%;
  height: auto;
`;

// ------ Export styles ----------------------------------------------------
const Markdown = styled.textarea`
  ${styles}
  resize: vertical;
`;

const Html = styled.div`
  ${styles}
  color: ${props => props.defaultValue === '<p>Add description</p>' ? '#8c9da9' : '#293034' };
`;

export {
  Markdown,
  Html,
}
