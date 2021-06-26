import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    min-height: 100vh;
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
        height: 36rem;
        margin-right: auto;
      }

      h1 {
        margin-top: 2.4rem;
        font: 700 3.2rem 'Poppins', sans-serif;
        line-height: 4.2rem;
      }

      p {
        margin-top: 1.6rem;
        font-size: 2rem;
        line-height: 3.2rem;
        color: ${theme.colors.white.background};
      }
    }

    main {
      padding: 7.2rem 3.2rem;
      display: flex;
      align-items: center;
      justify-content: center;

      flex: 9;
    }

    @media (max-width: 768px) {
      flex-direction: column;

      aside {
        padding: 7.2rem 2.4rem;
        text-align: center;

        svg {
          width: 100%;
        }

        h1 {
          margin-top: 2.4rem;
          font: 700 3.2rem 'Poppins', sans-serif;
          line-height: 4.2rem;
        }

        p {
          margin-top: 1.6rem;
          font-size: 2rem;
          line-height: 3.2rem;
          color: ${theme.colors.white.background};
        }
      }

      main {
        padding: 5.6rem 2.4rem 7.2rem;
      }
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

  > svg {
    width: 15rem;
    margin-bottom: 3.2rem;
    align-self: center;
  }
`;
