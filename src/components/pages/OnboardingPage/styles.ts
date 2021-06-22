import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    height: 100vh;
    display: flex;
    align-items: stretch;

    aside {
      padding: 12rem 8rem;

      display: flex;
      flex-direction: column;
      justify-content: center;

      flex: 7;

      color: ${theme.colors.white.details};
      background-color: ${theme.colors.purple};

      svg {
        max-width: 70%;
      }

      h1 {
        margin-top: 1.6rem;
        font: 700 3.6rem 'Poppins', sans-serif;
        line-height: 4.2rem;
      }

      p {
        margin-top: 1.6rem;
        font-size: 2.4rem;
        line-height: 3.2rem;
        color: ${theme.colors.white.background};
      }
    }

    main {
      padding: 0 3.2rem;
      display: flex;
      align-items: center;
      justify-content: center;

      flex: 9;
    }
  `}
`;

export const MainContent = styled.div`
  width: 100%;
  max-width: 32rem;

  display: flex;
  flex-direction: column;
  align-items: stretch;

  text-align: center;

  > img {
    margin-bottom: 4.8rem;
    align-self: center;
  }
`;
