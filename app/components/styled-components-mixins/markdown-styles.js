import { css } from 'styled-components'

const markdownStyles = css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #293034;
    font-weight: bold;
  }

  h1 {
    font-size: 28px;
  }

  h2 {
    font-size: 24px;
  }

  h3 {
    font-size: 18px;
  }

  h4 {
    font-size: 16px;
  }

  h5 {
    font-size: 14px;
  }

  hr {
    height: 1px;
    border: 0;
    color: #d7e3ec;
    background-color: #d7e3ec;
  }

  p,
  blockquote,
  ul,
  ol,
  dl,
  li,
  table,
  pre {
    font-size: 14px;
    margin: 15px 0;
    line-height: 1.5;
  }

  p:first-child {
    margin: 2px;
  }

  ul,
  ol {
    padding-left: 30px;
  }

  ul :first-child,
  ol :first-child {
    margin-top: 0;
  }

  ul :last-child,
  ol :last-child {
    margin-bottom: 0;
  }

  li {
    margin: 5px 0;
  }

  li :first-child {
    margin: 0 0 5px 0;
  }

  ul li {
    list-style-type: disc;
  }

  ol li {
    list-style-type: decimal;
  }

  strong {
    font-weight: bold;
  }

  em {
    font-style: italic;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  table,
  th,
  td {
    border: 1px solid #d7e3ec;
    border-radius: 3px;
    padding: 5px;
  }

  tr:nth-child(even) {
    background-color: #d7e3ec;
  }

  a,
  a:visited {
    color: #0799ea;
    background-color: inherit;
    text-decoration: none;
  }

  button {
    font-size: 14px;
    color: #fff;
    padding: 4px 6px;
    border-radius: 5px;
    background-color: #293034;
  }

  code,
  pre {
    font-family: Monaco, monospace;
    font-size: 12px;
    border-radius: 3px;
    background-color: #e7eced;
    color: inherit;
  }

  p code {
    border: 1px solid #293034;
    margin: 0 2px;
    padding: 0 5px;
  }

  pre {
    border: 1px solid #293034;
    overflow: auto;
    padding: 4px 8px;
  }

  pre > code {
    border: 0;
    margin: 0;
    padding: 0;
  }
`

export { markdownStyles }
