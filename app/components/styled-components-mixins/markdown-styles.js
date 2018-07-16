import { css } from 'styled-components'

const markdownStyles = css`
    h1 {
        font-size: 2em;
        font-weight: bold;
        margin: 0.67em 0;
    }

    h2 {
        font-size: 1.5em;
        font-weight: bold;
        margin: 0.83em 0;
    }

    h3 {
        font-size: 1.17em;
        font-weight: bold;
        margin: 1em 0;
    }

    ul, ol {
        display: block;
        list-style-type: disc;
        padding-left: 40px;
        margin: 1em 0;
    }

    ol {
        list-style-type: decimal;
    }

    li {
        display: list-item;
    }

    blockquote {
        margin: 1em 40px;
    }

    pre {
        margin: 1em 0;
        white-space: pre;
    }
`;

export {
  markdownStyles
}
