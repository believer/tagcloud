import { css } from '@emotion/core'

export const globalStyles = css`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    font-family: 'Noto Sans', serif;
    margin: 0;
  }

  a {
    color: hsl(160, 50%, 50%);
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`
