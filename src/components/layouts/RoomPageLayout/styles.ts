import styled, { css } from 'styled-components';

import { Container as QuestionContainer } from '~/components/rooms/Question/styles';

export const HeaderSeparator = styled.div`
  ${({ theme }) => css`
    height: 3.2rem;
    width: 1px;
    margin: 0 0.8rem;
    background-color: ${theme.colors.gray.light};
  `}
`;

export const Container = styled.div`
  min-height: 100vh;
  padding-bottom: 3.6rem;

  display: flex;
  flex-direction: column;

  header {
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
    padding: 2.4rem 2.4rem 2.4rem 3.2rem;
    border-bottom: 1px solid #e2e2e2;

    display: flex;
    justify-content: space-between;
    align-items: center;

    svg {
      max-height: 5.6rem;
    }

    > div {
      display: grid;
      align-items: center;
      grid-template-columns: repeat(4, auto);
      column-gap: 0.8rem;

      > div {
        display: flex;
        align-items: center;
      }
    }
  }

  main {
    width: 100%;
    max-width: calc(800px + 4.8rem);
    padding: 0 3.6rem;
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    flex: 1;
  }

  @media (max-width: 768px) {
    header {
      padding: 3.6rem 2.4rem;
      flex-direction: column;

      > div {
        margin-top: 2.4rem;
      }
    }

    main {
      padding: 0 2.4rem;
    }
  }

  @media (max-width: 550px) {
    header > div {
      grid-template-columns: repeat(1, auto);
      grid-template-rows: repeat(4, auto);

      > div {
        margin-top: 0.8rem;

        button {
          flex: 1;
        }
      }
    }
  }

  @media (max-width: 470px) {
    main {
      padding: 0 1.6rem;

      ${QuestionContainer} footer {
        flex-direction: column;

        > *:nth-child(1) {
          align-self: flex-start;
        }

        > *:nth-child(2) {
          margin-top: 1.6rem;
          align-self: flex-end;
        }
      }
    }
  }

  @media (max-width: 340px) {
    header > div > div {
      flex-direction: column;

      button {
        flex: unset;
        align-self: stretch;
      }

      ${HeaderSeparator} {
        height: 1px;
        width: 90%;
        margin: 0.8rem 0;
      }
    }
  }
`;

export const RoomTitle = styled.div`
  ${({ theme }) => css`
    margin: 3.2rem 0 2.4rem;
    display: flex;
    align-items: center;

    h1 {
      font-family: 'Poppins', sans-serif;
      font-size: 2.4rem;
      color: ${theme.colors.black};
    }

    span {
      margin-left: 1.6rem;
      border-radius: 99rem;
      padding: 0.8rem 1.6rem;

      color: ${theme.colors.white.details};
      font-weight: 500;
      font-size: 1.4rem;
      text-align: center;

      background-color: ${theme.colors.purple.dark};
    }
  `}
`;
