import styled, { css } from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  padding-bottom: 3.6rem;

  display: flex;
  flex-direction: column;

  header {
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
    padding: 2.4rem;
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
      grid-template-columns: repeat(5, auto);
      column-gap: 0.8rem;
    }
  }

  main {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    flex: 1;
  }
`;

export const HeaderSeparator = styled.div`
  ${({ theme }) => css`
    height: 3.2rem;
    width: 1px;
    margin: 0 0.8rem;
    background-color: ${theme.colors.gray.light};
  `}
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

      background-color: ${theme.colors.pink.dark};
    }
  `}
`;
