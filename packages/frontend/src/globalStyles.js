import { css } from '@emotion/core'

export const globalStyles = css`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    color: hsl(244, 17%, 29%);
    font-family: 'Noto Sans', serif;
    margin: 0;
  }

  a {
    color: hsl(348, 100%, 70%);
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`
