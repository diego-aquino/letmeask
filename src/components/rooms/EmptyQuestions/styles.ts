import styled, { css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    margin: 3.2rem 0 7.2rem;
    text-align: center;

    svg,
    h3 {
      opacity: 0.8;
    }

    h3 {
      margin: 1.6rem 0 0.8rem;

      font-family: 'Poppins', sans-serif;
      font-weight: 600;
      font-size: 1.8rem;
      color: ${theme.colors.black};
    }

    p {
      font-size: 1.4rem;
      color: ${theme.colors.gray.dark};
      opacity: 0.9;
    }
  `}
`;
