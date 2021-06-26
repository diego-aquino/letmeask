import { createGlobalStyle, css } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  ${({ theme }) => css`
    :root {
      font-size: 56.25%;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body,
    input,
    button,
    textarea {
      font: 400 1.6rem 'Roboto', sans-serif;
    }

    body {
      color: ${theme.colors.black};
      background-color: ${theme.colors.white.background};
      overflow-x: hidden;
    }
  `}
`;

export default GlobalStyle;
